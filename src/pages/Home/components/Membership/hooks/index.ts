import {ethers, BigNumber} from "ethers"
import {useState, useEffect, Dispatch, SetStateAction, useCallback, useContext} from "react"
import ClearanceCard001 from "../../../../../abi/ClearanceCard001.json"
import FanboyPass from "../../../../../abi/FanboyPass.json"
import TopClearanceCard from "../../../../../abi/TopClearanceCard.json"
import {toastSuccess} from "../../../../../components/Toast"
import config from "../../../../../config/eth"
import {Web3Context} from "../../../../../context"

export type ClearanceCardType = "TOP" | "001" | undefined
export type fanboyPass = "Fanboy Pass"
type MembershipState = {
	buyingClearanceCardType: ClearanceCardType
	setBuyingClearanceCardType: Dispatch<SetStateAction<ClearanceCardType>>
	clearanceCardMintValue: string
	clearanceCardIDsMintValue: string
	setClearanceCardMintValue: Dispatch<SetStateAction<string>>
	setClearanceCardIDsMintValue: Dispatch<SetStateAction<string>>
	onPurchaseClearanceCard: () => Promise<void>
	onPurchaseTopClearanceCard: () => Promise<void>
	onMintFanboyPass: () => Promise<void>
	processingClearanceCardPurchase: boolean
	processingFanboyPassMint: boolean
	clearanceCardTotal: number
	// topClearanceCardTotal: number
	// fanboyPassTotal: number
}

const useMembership = (): MembershipState => {
	const {infuraProvider, purchase, freeMint} = useContext(Web3Context)
	const [processingClearanceCardPurchase, setProcessingClearanceCardPurchase] = useState(false)
	const [processingFanboyPassMint, setProcessingFanboyPassMint] = useState(false)
	const [clearanceCardMintValue, setClearanceCardMintValue] = useState<string>("")
	const [clearanceCardIDsMintValue, setClearanceCardIDsMintValue] = useState<string>("1,2,3")
	const [buyingClearanceCardType, setBuyingClearanceCardType] = useState<ClearanceCardType>()
	// const [mintingFanboyPassType, setMintingFanboyPassType] = useState<fanboyPass>()
	const [clearanceCardTotal, setClearanceCardTotal] = useState(0)
	// const [topClearanceCardTotal, setTopClearanceCardTotal] = useState(0)
	// const [fanboyPassTotal, setFanboyPassTotal] = useState(0)

	// const getCardsTotal = async () => {
	// 	const fanboyPassContract = new ethers.Contract(
	// 		config.FANBOY_PASS_CONTRACT_ADDRESS,
	// 		FanboyPass.abi,
	// 		infuraProvider
	// 	)
	// 	//const test = await fanboyPassContract.totalSupply()
	// 	setFanboyPassTotal(BigNumber.from(await fanboyPassContract.totalSupply()).toNumber())
	// }

	const getCardsTotal = async () => {
		const clearanceContract = new ethers.Contract(
			config.CLEARANCE_CARD_001_CONTRACT_ADDRESS,
			ClearanceCard001.abi,
			infuraProvider
		)

		// const topClearanceContract = new ethers.Contract(
		// 	config.TOP_CLEARANCE_CARD_CONTRACT_ADDRESS,
		// 	TopClearanceCard.abi,
		// 	infuraProvider
		// )
		setClearanceCardTotal(BigNumber.from(await clearanceContract.totalSupply()).toNumber())
		// setTopClearanceCardTotal(BigNumber.from(await topClearanceContract.totalSupply()).toNumber())
	}

	const purchaseClearanceCardSuccess = async () => {
		toastSuccess(
			`Congratulations! You successfully bought ${
				buyingClearanceCardType === "001" ? "Skeleton Steph Genesis Series" : "Top Clearance Card"
			}. Welcome to the Krawler family, dear friend :)`
		)
		await getCardsTotal()
		setBuyingClearanceCardType(undefined)
		setProcessingClearanceCardPurchase(false)
	}

	const mintFanboyPassSuccess = async () => {
		toastSuccess(
			`Congratulations! You successfully minted your fanboy pass for an allowlist spot! Welcome fanboy / fangirl!`
		)
		await getCardsTotal()
		// setMintingFanboyPassType(undefined)
		setProcessingFanboyPassMint(false)
	}

	const onPurchaseClearanceCard = useCallback(async () => {
		setProcessingClearanceCardPurchase(true)
		try {
			const success = await purchase({
				contractAddress: config.CLEARANCE_CARD_001_CONTRACT_ADDRESS,
				abi: ClearanceCard001.abi,
				etherValueString: "0.045",
				mintAmount: clearanceCardMintValue
			})
			if (success) {
				setTimeout(purchaseClearanceCardSuccess, 5000)
			} else {
				setProcessingClearanceCardPurchase(false)
				setClearanceCardMintValue("")
				setClearanceCardIDsMintValue("")
			}
		} catch (e) {
			console.error(e)
			setProcessingClearanceCardPurchase(false)
		}
	}, [clearanceCardMintValue, purchase])

	const onPurchaseTopClearanceCard = useCallback(async () => {
		setProcessingClearanceCardPurchase(true)
		try {
			const success = await purchase({
				contractAddress: config.TOP_CLEARANCE_CARD_CONTRACT_ADDRESS,
				abi: TopClearanceCard.abi,
				etherValueString: "0.5",
				mintAmount: clearanceCardMintValue
			})
			if (success) {
				setTimeout(purchaseClearanceCardSuccess, 5000)
			} else {
				setProcessingClearanceCardPurchase(false)
			}
		} catch (e) {
			console.error(e)
			setProcessingClearanceCardPurchase(false)
		}
	}, [clearanceCardMintValue, purchase])

	const onMintFanboyPass = useCallback(async () => {
		setProcessingFanboyPassMint(true)
		try {
			const success = await freeMint({
				contractAddress: config.FANBOY_PASS_CONTRACT_ADDRESS,
				abi: FanboyPass.abi
			})
			if (success) {
				setTimeout(mintFanboyPassSuccess, 5000)
			} else {
				setProcessingFanboyPassMint(false)
			}
		} catch (e) {
			console.error(e)
			setProcessingFanboyPassMint(false)
		}
	}, [clearanceCardMintValue, purchase])

	useEffect(() => {
		getCardsTotal()
	}, [])

	return {
		buyingClearanceCardType,
		setBuyingClearanceCardType,
		onPurchaseClearanceCard,
		onPurchaseTopClearanceCard,
		onMintFanboyPass,
		clearanceCardMintValue,
		clearanceCardIDsMintValue,
		setClearanceCardMintValue,
		setClearanceCardIDsMintValue,
		processingClearanceCardPurchase,
		processingFanboyPassMint,
		clearanceCardTotal
		// topClearanceCardTotal
		// fanboyPassTotal
		// mintingFanboyPassType,
		// setMintingFanboyPassType
	}
}

export default useMembership
