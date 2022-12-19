import {InfuraProvider, JsonRpcProvider} from "@ethersproject/providers"
import {formatEther} from "@ethersproject/units"
import {ethers} from "ethers"
import React, {useEffect, useRef, useState} from "react"
import Core from "web3modal"
import {toastError} from "../components/Toast"
import {web3Modal} from "../config/eth"
import infuraConfig from "../config/infura"
import {formatReadableAddress} from "../utils"

interface IWeb3Context {
	instance?: Core
	signer?: ethers.Signer
}

interface IWeb3ContextContainer {
	ethBalance: number
	address: string | null
	walletConnected: boolean
	signIn: () => Promise<ethers.Signer>
	purchase: (params: {
		contractAddress: string
		abi: ethers.ContractInterface
		etherValueString: string
		mintAmount: string
	}) => Promise<boolean>
	purchaseAllowlist: (params: {
		contractAddress: string
		abi: ethers.ContractInterface
		etherValueString: string
		IDs: string
		mintAmount: string
	}) => Promise<boolean>
	freeMint: (params: {contractAddress: string; abi: ethers.ContractInterface}) => Promise<boolean>
	infuraProvider: JsonRpcProvider
}

export const Web3Context = React.createContext<IWeb3ContextContainer>(
	{} as unknown as IWeb3ContextContainer
)

export const useWeb3 = (): IWeb3ContextContainer => {
	const [web3Context, setWeb3Context] = useState<IWeb3Context>({})
	const [ethBalance, setEthBalance] = useState(0)
	const [address, setAddress] = useState<string | null>(null)

	const infuraProvider = useRef(
		new InfuraProvider("mainnet", {
			projectId: infuraConfig.INFURA_ID
		})
	)

	const getBalance = async () => {
		if (web3Context.signer) {
			setEthBalance(Number(formatEther(await web3Context.signer.getBalance())))
		}
	}

	const getAddress = async () => {
		if (web3Context.signer) {
			setAddress(formatReadableAddress(await web3Context.signer.getAddress()))
		}
	}

	useEffect(() => {
		getBalance()
		getAddress()
	}, [web3Context.signer])

	const walletConnected = !!web3Context?.signer

	const signIn = async () => {
		let signer
		if (!web3Context.signer) {
			await web3Modal.clearCachedProvider()
			const instance = await web3Modal.connect()
			const provider = new ethers.providers.Web3Provider(instance)
			signer = provider.getSigner()
			setWeb3Context({instance, signer})
		} else {
			signer = web3Context.signer
		}

		return signer
	}

	const purchase = async ({
		contractAddress,
		abi,
		etherValueString,
		mintAmount
	}: {
		contractAddress: string
		abi: ethers.ContractInterface
		etherValueString: string
		mintAmount: string
	}): Promise<boolean> => {
		const signer = await signIn()
		const saleContract = new ethers.Contract(contractAddress, abi, signer)
		const etherValue = ethers.utils.parseEther(etherValueString)
		const amount = parseInt(mintAmount)
		const value = etherValue.mul(amount)
		const ethAmount = formatEther(value.toString())
		const _ethBalance = Number(formatEther(await signer.getBalance()))
		if (Number(ethAmount) > _ethBalance) {
			toastError(
				`Woops! You don't have enough ETH in your wallet. Your balance: ${_ethBalance} ETH, you need at least ${ethAmount} ETH.`
			)
			return false
		} else {
			try {
				const tx = await saleContract.mint(amount, {value})
				await tx.wait()
				return true
			} catch (err) {
				// console.log(err.message) // prints ethers error message containing the json rpc response as it is (along with error stacks from node if sent)
				// console.log(err.error.message) // short and sweet error message
				toastError(`Woops! The mint failed with message: ${err.error.message}`)
				return false
			}
		}
	}

	const purchaseAllowlist = async ({
		contractAddress,
		abi,
		etherValueString,
		IDs,
		mintAmount
	}: {
		contractAddress: string
		abi: ethers.ContractInterface
		etherValueString: string
		IDs: string
		mintAmount: string
	}): Promise<boolean> => {
		const signer = await signIn()
		const saleContract = new ethers.Contract(contractAddress, abi, signer)
		const etherValue = ethers.utils.parseEther(etherValueString)
		const amount = parseInt(mintAmount)
		const value = etherValue.mul(amount)
		const ethAmount = formatEther(value.toString())
		const _ethBalance = Number(formatEther(await signer.getBalance()))
		const splitIDs = IDs.split(",")
		const parsedIDs = splitIDs.map(idItem => parseInt(idItem))
		if (Number(ethAmount) > _ethBalance) {
			toastError(
				`Woops! You don't have enough ETH in your wallet. Your balance: ${_ethBalance} ETH, you need at least ${ethAmount} ETH.`
			)
			return false
		} else {
			try {
				const tx = await saleContract.allowlistMint(amount, parsedIDs, {value})
				await tx.wait()
				return true
			} catch (err) {
				// console.log(err.message) // prints ethers error message containing the json rpc response as it is (along with error stacks from node if sent)
				// console.log(err.error.message) // short and sweet error message
				toastError(`Woops! The mint failed with message: ${err.error.message}`)
				return false
			}
		}
	}

	const freeMint = async ({
		contractAddress,
		abi
	}: {
		contractAddress: string
		abi: ethers.ContractInterface
	}): Promise<boolean> => {
		const signer = await signIn()
		const minter = await signer.getAddress()
		const saleContract = new ethers.Contract(contractAddress, abi, signer)
		const amount = parseInt("1")
		const hasNFT = Number(await saleContract.balanceOf(minter))
		if (hasNFT >= Number(amount)) {
			toastError(`Woops! You have already minted a free pass.`)
			return false
		} else {
			const tx = await saleContract.mint()
			await tx.wait()
			return true
		}
	}

	return {
		ethBalance,
		address,
		walletConnected,
		purchase,
		purchaseAllowlist,
		freeMint,
		signIn,
		infuraProvider: infuraProvider.current
	}
}
