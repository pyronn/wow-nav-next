import Image from "next/image";
import {Link as NextUILink} from '@nextui-org/link'
import {Link} from "@/navigation";
import {Divider} from "@nextui-org/divider";
import {useTranslations} from "next-intl";

type FooterProps = {
    className?: string
    registration?: {}
    footerLinkCategories?: FooterLinkCategory[]
    partnerLinks?: FooterLinks[]
    sponsor?: Sponsor
    socialLinks?: SocialLink[]
} & React.HTMLAttributes<HTMLElement>

type FooterLinks = {
    label: string,
    link: string,
}

type SocialLink = {
    icon: React.ReactNode,
    link: string
}
type Sponsor = {
    label?: string
    imgUrl?: string
    link: string
}

type FooterLinkCategory = {
    label: string,
    link: string,
    links: FooterLinks[]
}

export const Footer: React.FC<FooterProps> = ({
                                                  className,
                                                  registration,
                                                  sponsor,
                                                  footerLinkCategories,
                                                  partnerLinks,
                                                  socialLinks,
                                                  ...props
                                              }: {
    className?: string
    registration?: {}
    footerLinkCategories?: FooterLinkCategory[]
    partnerLinks?: FooterLinks[]
    sponsor?: Sponsor
    socialLinks?: SocialLink[]
}) => {
    const defaultClassName = 'p-10 flex flex-col gap-y-5 w-full justify-center items-center'
    const finalClassName = `${defaultClassName} ${className ? className : ''}`
    const t = useTranslations('Footer')
    return (
        <footer className={finalClassName} {...props}>
            <Divider/>
            <div className={'flex flex-row gap-x-32'}>
                <div className={'flex flex-col'}>
                    <p className={'text-xl font-bold'}>Nextjs Starter</p>
                    {
                        socialLinks &&
                        <div className={'flex flex-row'}>
                            {socialLinks.map((link, index) => (
                                <Link key={index} href={link.link} className={'mx-2 my-1'}>
                                    {link.icon}
                                </Link>
                            ))}
                        </div>
                    }
                    {sponsor &&
                        <Link href={sponsor.link}>
                            {sponsor.imgUrl ? (<Image src={sponsor.imgUrl}
                                                      alt={sponsor.label ? sponsor.label : 'sponsor'}/>) : sponsor.label}
                        </Link>
                    }
                </div>
                {footerLinkCategories &&
                    <div className={'flex flex-row gap-x-24'}>
                        {footerLinkCategories.map((category, index) => (
                            <div key={index} className={'flex flex-col gap-y-2'}>
                                <Link href={category.link} className={'font-bold'}>{category.label}</Link>
                                {category.links.map((footerLink, index) => (
                                    <Link key={index} href={footerLink.link}>
                                        {footerLink.label}
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                }
            </div>


            {partnerLinks &&
                <div className={'flex flex-row w-max-[60vw] flex-wrap'}>
                    <span className={'m-2 font-bold'}>{t('partnerLink')}</span>
                    {partnerLinks.map((partnerLink, index) => (
                        <NextUILink className={'m-2'} key={index} color={'foreground'} href={partnerLink.link}>
                            {partnerLink.label}
                        </NextUILink>
                    ))}
                </div>

            }

            <div>
                {/*    registration | 备案信息*/}
            </div>
        </footer>
    );
}
