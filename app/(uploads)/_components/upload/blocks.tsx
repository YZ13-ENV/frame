'use client'
import { useAppSelector } from "@/components/entities/store/store"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState } from "react"
import { LuComponent } from "react-icons/lu";
import { BiChevronDown, BiChevronUp, BiImage } from "react-icons/bi";

const Blocks = () => {
    const [selected, setSelected] = useState<'0' | '1' | '2'>('0')
    const blocks = useAppSelector(state => state.uploader.draft.draft.blocks)
    return (
        <div className="absolute bottom-0 z-10 px-4 border-t left-6 w-80 bg-card rounded-t-xl border-x">
            <Accordion type="single" value={selected} className="w-full">
                <AccordionItem value="1">
                    <AccordionTrigger onClick={() => setSelected(selected === '1' ? '0' : '1')}>
                        <div className="flex items-center gap-2 w-fit h-fit">
                            <LuComponent />
                            Компоненты
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col w-full gap-2 h-fit">
                            {
                                blocks.length
                                ? blocks.map((block, i) =>
                                    <div key={block.id + ' ' + i} className="flex items-center justify-between w-full px-2 rounded-lg cursor-pointer h-9 hover:bg-muted">
                                        { block.type }
                                        <div className="flex items-center gap-2">
                                            <BiChevronUp />
                                            <BiChevronDown />
                                        </div>
                                    </div>
                                )
                                : <div className="flex flex-col items-center justify-center w-full h-48 gap-4">
                                    <LuComponent size={28} className='text-muted-foreground' />
                                    <span className="text-sm text-center text-muted-foreground">Нет добавленных компонентов</span>
                                </div>
                            }
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="2">
                    <AccordionTrigger onClick={() => setSelected(selected === '2' ? '0' : '2')}>
                        <div className="flex items-center gap-2 w-fit h-fit">
                            <BiImage />
                            Обложка
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="w-full aspect-[4/3] rounded-lg bg-muted"></div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default Blocks