import {FunctionComponent} from "react"
import {ReactComponent as DiscordIcon} from "../../../../assets/icons/discord-grayscale.svg"
import {ReactComponent as IGIcon} from "../../../../assets/icons/instagram-grayscale.svg"
import {ReactComponent as TwitterIcon} from "../../../../assets/icons/twitter-grayscale.svg"
import SkeletonHeader from "../../../../assets/images/SkeletonStep_AboutSection_Header_Image.png"
import Button from "../../../../components/Button"
import Grid from "../../../../components/Grid"
import "./index.scss"

const About: FunctionComponent = () => (
	<Grid Component="section" row className="about">
		<Grid container>
			<Grid row className="about__top">
				<Grid row>
					<Grid size={2} xs={12} sm={12} lg={12} className="about__header" />
					<Grid size={8} xs={12} sm={12} lg={12} className="about__subheader">
						<h3>
							Skeleton Steph
							<br />
							An Animated Punk Rock Adventure!
							<br />
						</h3>
					</Grid>
				</Grid>
				<Grid row className="about__content">
					<Grid size={2} xs={12} sm={12} lg={12} />
					<Grid size={4} xs={12} sm={12} lg={12} className="about__col about__col--no-left-gutters">
						<ul>
							<li>
								After gigging for an eternity at The Fossil Skelderly Home, Skeleton Steph and The
								Krawlers get a lucky break playing at the famed Down Under Club, but when their
								momentous debut is interrupted by a mysterious fugitive covered in flesh, they band
								together to help it escape the evil clutches of the government known as The Clutch.
							</li>
							<h4 className="header-text">Creators</h4>
							<li>
								Sticky Shaw
								<br />
								Izzy Arias
								<br />
								Tracey Power
								<br />
								Greg Cipes
							</li>
							<h4 className="header-text">Writers</h4>
							<li>Izzy Arias and Tracey Power</li>
							<h4 className="header-text">Cast</h4>
							<li>
								Lilith Czar - Steph
								<br />
								Pete Wentz - Rob
								<br />
								Greg Cipes - Geoff
								<br />
								Tracey Power - Chris
							</li>
							<h4 className="header-text">Main Title Composer</h4>
							<li>
								Sticky Shaw
								<br />
								John Feldmann
								<br />
								Sky Stern
								<br />
								Greg Cipes
							</li>
							<br />
							<br />
						</ul>
					</Grid>
					<Grid size={4} xs={12} sm={12} lg={12} className="about__col">
						<ul>
							<li>
								<img src={SkeletonHeader} />
							</li>
							<li className="close-gap">You&apos;re Invited!</li>
							<li>
								<h4 className="header-text">Skeleton Steph x Seker Factory DAO Halloween Bash</h4>
							</li>
						</ul>
						<p>
							Come meet the creators behind Skeleton Steph and join us for an amazing night of IRL
							minting and reveal / redemption of the Genesis Mini-Series, live exclusive collectors
							NFT auction, live performances by the Krawlers + secret special guests, rockin&apos;
							merch, libations, giveaways, and much more!
						</p>
						<p>
							Want to become a custom character in the Skeleton Steph series? Show up and learn how!
						</p>
						<ul>
							<h4 className="header-text">Date</h4>
							<li>
								Saturday | October 29th, 2022
								<br />
								8PM - 2AM (doors open at 7:30PM)
							</li>
							<h4 className="header-text">Location</h4>
							<li>
								Seker Factory DAO (DTLA)
								<br />
								836 S Los Angeles Street
								<br />
								Los Angeles, CA 90014
							</li>
							<h4 className="header-text">Admission</h4>
							<li>
								Skeleton Steph Genesis Mini-Series NFT Holders
								<br />
								Seker Factory DAO Clearance Card Holders
								<br />
								(1 NFT = 1 admission ticket)
								<br />
								Alternative admission tickets can be bought (coming soon)
								<br />
								<br />
							</li>
						</ul>
					</Grid>
					<Grid size={2} xs={12} sm={12} lg={12} className="about__col">
						<div className="contact">
							<Button variant="secondary" color="white">
								<a href="https://discord.gg/mHysqPTMJ3" target="_blank" rel="noopener noreferrer">
									<DiscordIcon height="20px" width="20px" />
									Join Our Discord
								</a>
							</Button>
							<Button variant="secondary" color="white">
								<a
									href="https://twitter.com/realskellysteph"
									target="_blank"
									rel="noopener noreferrer"
								>
									<TwitterIcon height="20px" width="20px" />
									Follow Our Twitter
								</a>
							</Button>
							<Button variant="secondary" color="white">
								<a
									href="https://www.instagram.com/realskeletonsteph/"
									target="_blank"
									rel="noopener noreferrer"
								>
									<IGIcon height="20px" width="20px" />
									Follow Our IG
								</a>
							</Button>
						</div>
						<p className="contact__email">
							For inquiries, email us at{" "}
							<a href="mailto:info@skeletonsteph.com">info@skeletonsteph.com</a>
						</p>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	</Grid>
)

export default About
