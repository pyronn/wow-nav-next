import Sidebar from "@/components/sidebar";
import {AiFillAccountBook, AiFillAudio, AiFillHome} from "react-icons/ai";

export default function AboutLayout({children}: { children: React.ReactNode }) {
    const menus = [
        {title: 'home', key: "home", icon: <AiFillHome/>, link: '/',},
        {title: 'about', key: "about", icon: <AiFillAccountBook/>, link: '/about'},
        {
            title: 'category', icon: <AiFillAudio/>, link: "", children: [
                {
                    title: 'category1',
                    icon: <AiFillHome/>,
                    link: '/category1'
                },
                {
                    title: 'category2',
                    icon: <AiFillHome/>,
                    link: '/category2'
                }
            ]
        },
    ]
    return (
        <main className="flex flex-row">
            <div >
                <Sidebar menus={menus}/>
            </div>
            <div className={'flex-auto h-auto'}>
                {children}
            </div>
        </main>
    )
}
