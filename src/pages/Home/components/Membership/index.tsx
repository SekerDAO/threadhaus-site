// import {FunctionComponent, useContext, useState} from "react"
import {FunctionComponent, useContext, useState} from "react"
import {ReactComponent as DoneCircle} from "../../../../assets/icons/done-circle.svg"
// import Opensea from "../../../../assets/icons/opensea_logo.png"
import groupiePassSrc from "../../../../assets/images/SkeletonSteph_Genesis_Blindbox.png"
import Button from "../../../../components/Button"
import Grid from "../../../../components/Grid"
import ImageModal from "../../../../components/Modal/ImageModal"
import {Web3Context} from "../../../../context"
import BuyClearanceCard from "../BuyClearanceCard"
import useMembership from "./hooks"
import "./index.scss"

const Membership: FunctionComponent = () => {
	const [fullVideoSrc, setFullVideoSrc] = useState<string | undefined>(undefined)

	const {
		buyingClearanceCardType,
		setBuyingClearanceCardType,
		onPurchaseClearanceCard,
		onPurchaseTopClearanceCard,
		clearanceCardMintValue,
		clearanceCardIDsMintValue,
		setClearanceCardMintValue,
		processingClearanceCardPurchase,
		// processingFanboyPassMint,
		clearanceCardTotal
		// fanboyPassTotal
		// onMintFanboyPass
	} = useMembership()

	const {signIn} = useContext(Web3Context)

	return (
		<>
			<BuyClearanceCard
				buyingClearanceCardType={buyingClearanceCardType}
				// mintingFanboyPassType={mintingFanboyPassType}
				setBuyingClearanceCardType={setBuyingClearanceCardType}
				// setMintingFanboyPassType={setMintingFanboyPassType}
				clearanceCardMintValue={clearanceCardMintValue}
				clearanceCardIDsMintValue={clearanceCardIDsMintValue}
				setClearanceCardMintValue={setClearanceCardMintValue}
				onPurchaseClearanceCard={onPurchaseClearanceCard}
				onPurchaseTopClearanceCard={onPurchaseTopClearanceCard}
				// onMintFanboyPass={onMintFanboyPass}
				// processingFanboyPassMint={processingFanboyPassMint}
				processing={processingClearanceCardPurchase}
			/>
			<ImageModal
				src={fullVideoSrc}
				open={!!fullVideoSrc}
				onClose={() => setFullVideoSrc(undefined)}
				video
			/>
			<Grid Component="section" row className="membership">
				<Grid container>
					<Grid size={2} xs={12} sm={12} lg={12} />
					<Grid size={8} xs={12} sm={12} lg={12} className="membership__content">
						<Grid size={8} xs={12} sm={12} lg={12} className="membership__subheader">
							<h3>
								Introducing the Official
								<br />
								Skeleton Steph Genesis Mini-Series!
								<br />
							</h3>
						</Grid>
						<Grid size={12} xs={12} sm={12} lg={12} className="membership__description">
							<p className="membership__description-content">
								Sprouting from the art of renowned street artist, Sticky Shaw as well as
								collaborations with creative heavy hitters, Izzy Arias, Greg Cipes, Tracey Power,
								and Pete Wentz, Skeleton Steph is taking its first steps into web3! With the drop of
								our official Genesis Mini-Series, the team behind Skeleton Steph is employing the
								power of Storytelling NFTs to onboard you, our amazing community, to help us
								determine where Steph and the Krawlers go next! At the cross-section of art,
								cartoon, music, and fashion, the possibilities are endless, and we want you with us
								every step of the way to help build the raddest adventure for all!
								<br />
								<br />
								Can&apos;t wait to jump in and be an early supporter? Grab your Genesis Character
								NFT today and get the opportunity to have your amazing ideas guide our creators in
								telling this one-of-a-kind story. Want to know how you can potentially be an actual
								character on the show? Each NFT grants you access to the private channels in our
								Discord where you can reach out to our team and learn how! We will be revealing
								elements of your Genesis Character as time goes on. We will all vote together as NFT
								holders on the date of the final full reveal, live at Seker Factory DAO in Downtown
								Los Angeles. Stay tuned! You may very well be one of the lucky ones to mint an
								ultra-rare Skelly!
							</p>
						</Grid>
						<Grid row className="membership__items-container">
							<Grid size={6} xs={12} sm={12} lg={12} className="membership__item">
								<Grid className="membership__item-img-container">
									<img src={groupiePassSrc} className="membership__item-img-container-steph_img" />
									<p className="membership__subheader-2">
										Limited Skeleton Steph &quot;Genesis Series&quot;
									</p>
									<p className="membership__item-minted">
										{clearanceCardTotal} minted / 2100 total
									</p>
									<Button
										onClick={async () => {
											await signIn()
											setBuyingClearanceCardType("001")
										}}
									>
										Mint (Ξ 0.045)
									</Button>
								</Grid>
							</Grid>
							<Grid size={6} xs={12} sm={12} lg={12} className="membership__item">
								<Grid className="membership__item-img-container">
									<h3 className="membership__subheader-2">Join the Skeleton Steph Story!</h3>
									<ul>
										<li>
											<div className="membership__item-icon-container">
												<DoneCircle width="20px" height="20px" />
											</div>
											<p>
												Become one of the first to join the official Skeleton Steph community!
												<br />
											</p>
										</li>
										<li>
											<div className="membership__item-icon-container">
												<DoneCircle width="20px" height="20px" />
											</div>
											<p>
												The Genesis Mini-Series includes variations of 7 Skeleton Steph characters,
												with rarity features!
												<br />
											</p>
										</li>
										<li>
											<div className="membership__item-icon-container">
												<DoneCircle width="20px" height="20px" />
											</div>
											<p>
												At 25%, 50%, and 75% of the total supply minted, you will get to see a bit
												more of your Characters attributes! All minted NFTs will be fully unveiled
												at a date the we all agree on. Vote with your NFT!
												<br />
											</p>
										</li>
										<li>
											<div className="membership__item-icon-container">
												<DoneCircle width="20px" height="20px" />
											</div>
											<p>
												Each minted NFT comes with airdrops to holders for future Skeleton Steph
												drops.
												<br />
											</p>
										</li>
										<li>
											<div className="membership__item-icon-container">
												<DoneCircle width="20px" height="20px" />
											</div>
											<p>
												Each minted NFT grants 1 admission to the exclusive Skeleton Steph x Seker
												Factorys Halloween party on Oct. 29th as well as a special screening /
												creators panel event at Seker Factory (date T.B.D.).
												<br />
											</p>
										</li>
									</ul>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid size={2} xs={12} sm={12} lg={12} />
				</Grid>
			</Grid>
		</>
	)
}

export default Membership
