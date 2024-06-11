import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";
import {Button} from "@nextui-org/button";
import {AiOutlineCheck} from "react-icons/ai";

type PricingProps = {
    pricePlans: PricePlan[]
} & React.HTMLAttributes<HTMLElement>

type PricePlan = {
    title: string
    price: number
    description: string
    link: string
    features: string[]
}

export const Pricing: React.FC<PricingProps> = ({pricePlans}: { pricePlans: PricePlan[] }) => {
    return (
        <div className={'flex flex-row flex-wrap justify-center items-center gap-x-12 gap-y-12'}>
            {
                pricePlans.map((plan, index) => (
                    <Card key={index} className={'min-w-[300px] transform hover:scale-105'} isFooterBlurred={true}>
                        <CardHeader>
                            <p className={'text-xl font-bold'}>{plan.title}</p>
                        </CardHeader>
                        <Divider/>

                        <CardBody>
                            <p className={'text-xl font-bold p-2'}>${plan.price}/month</p>
                            <p className={'p-1 text-foreground'}>{plan.description}</p>
                            <p className={'p-2 font-bold'}>Features</p>
                            <ul className={'p-2'}>
                                {plan.features.map((feature, index) => (
                                    <li key={index} className={'p-1'}><AiOutlineCheck color={'green'}
                                                                                      className={'m-1 inline'}/>{feature}
                                    </li>
                                ))}
                            </ul>
                        </CardBody>
                        <CardFooter>
                            <Button color={'primary'} fullWidth={true} href={plan.link}>Get Started</Button>
                        </CardFooter>
                    </Card>
                ))
            }
        </div>
    )
}
