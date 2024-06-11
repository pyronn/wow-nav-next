'use client'
import {useTranslations} from "next-intl";
import Hero from "@/components/hero";
import {Pricing} from "@/components/pricing";
import {Button} from "@nextui-org/button";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";
import {Input} from "@nextui-org/input";
import {MailIcon} from "@nextui-org/shared-icons";
import {Checkbox} from "@nextui-org/checkbox";
import {Link} from "@nextui-org/link";
import {LoginModal} from "@/components/login-modal";
import {Toaster} from "sonner";


export default function Home() {
    const h = useTranslations('Home')
    const pricePlans = [
        {
            title: "Basic",
            price: 10,
            description: "Basic plan",
            link: "#",
            features: ["Feature 1", "Feature 2"]
        }, {
            title: "Pro",
            price: 20,
            description: "Pro plan",
            link: "#",
            features: ["Feature 1", "Feature 2"]
        }, {
            title: "Enterprise",
            price: 30,
            description: "Enterprise plan",
            link: "#",
            features: ["Feature 1", "Feature 2"]
        }
    ]

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <main
            className="mx-auto mt-6 flex h-[80vh] flex-col items-center text-center gap-8 text-foreground bg-background">
            <Toaster position={'top-center'}/>
            <Hero/>

            <Pricing pricePlans={pricePlans}/>
            <Button onPress={onOpen} color="primary">Open Modal</Button>
            <LoginModal isOpen={isOpen} onOpenChange={onOpenChange}  />

        </main>
    );
}
