'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState } from "react"
import { LuComponent } from "react-icons/lu";
import { BiImage, BiPin } from "react-icons/bi";
import ThumbnailBlock from "./side-sections/thumbnail";
import Components from "./side-sections/components";
import Attachments from "./side-sections/attachments";

type Selects = '0' | '1' | '2' | '3'
const Blocks = () => {
    const [selected, setSelected] = useState<Selects>('0')
    return (
        <div className="absolute bottom-0 z-10 px-4 border-t left-6 w-80 bg-card rounded-t-xl border-x">
            <Accordion type="single" value={selected} className="w-full"
            onValueChange={value => setSelected(value as Selects)}>
                <AccordionItem value="1">
                    <AccordionTrigger onClick={() => selected === "1" ? setSelected('0') : null}>
                        <div className="flex items-center gap-2 w-fit h-fit">
                            <LuComponent />
                            Компоненты
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <Components />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="2">
                    <AccordionTrigger onClick={() => selected === "2" ? setSelected('0') : null}>
                        <div className="flex items-center gap-2 w-fit h-fit relative">
                            <BiImage />
                            Обложка
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <ThumbnailBlock />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="3">
                    <AccordionTrigger onClick={() => selected === "3" ? setSelected('0') : null}>
                        <div className="flex items-center gap-2 w-fit h-fit">
                            <BiPin />
                            Прикрепленные файлы
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <Attachments />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default Blocks