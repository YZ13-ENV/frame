'use client'
import { MotionConfig, motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { ElementRef, LegacyRef, MutableRefObject, memo, useCallback, useLayoutEffect, useRef, useState } from 'react'
import { useDebounceEffect, useInterval } from 'ahooks';

type Props = {
    link: string
    forcedIsVideo?: boolean
}
const AmbientLight = ({ link, forcedIsVideo }: Props) => {
    const isVideo = forcedIsVideo ? forcedIsVideo : link.endsWith('.mp4')
    const mediaBlock = useRef<ElementRef<'video' | 'img'>>(null)
    const canvas = useRef<ElementRef<'canvas'>>(null);
    const bgCanvas = useRef<ElementRef<'canvas'>>(null);
    const isInView = useInView(mediaBlock)
    const [run, setRun] = useState<boolean>(true);
    
    const repaintBgCanvas = () => {
        if (bgCanvas.current) {
            const context = bgCanvas.current.getContext("2d");
            if (context && mediaBlock.current) {
                context.imageSmoothingEnabled = true
                context.imageSmoothingQuality = 'high'
                context.filter = 'blur(25px) brightness(50%)'
                context.drawImage(mediaBlock.current, 0, 0, bgCanvas.current.width, bgCanvas.current.height);
            }
        }
    }
    const repaintAmbientLight = () => {
        if (canvas.current) {
            const context = canvas.current.getContext("2d");
            if (context && mediaBlock.current) {
                context.imageSmoothingEnabled = true
                context.imageSmoothingQuality = 'high'
                context.filter = 'blur(25px) brightness(75%)'
                context.drawImage(mediaBlock.current, 0, 0, canvas.current.width, canvas.current.height);
                repaintBgCanvas()
            }
        }
    }
    const startAmbientLightRepaint = useCallback(() => {
        if (mediaBlock.current && canvas.current) {
            setRun(true)
        }
    }, [mediaBlock, canvas]);

    const stopAmbientLightRepaint = useInterval(() => {
        repaintAmbientLight()
    }, run ? 1000 / 10 : undefined);
    useDebounceEffect(() => {
        if (mediaBlock.current && isVideo) {
            const video = mediaBlock.current as HTMLVideoElement
            if (run) {
                video.play()
            } else {
                video.pause()
            }
        }
    },[run, mediaBlock], { wait: 750 })
    useDebounceEffect(() => {
        if (isInView) {
            setRun(true)
        } else {
            setRun(false)
        }
    },[isInView], { wait: 750 })

    useLayoutEffect(() => {
        const block = mediaBlock.current
        if (block) {
            if (isVideo) {
                const video = block as HTMLVideoElement
                const handlePlay = () => startAmbientLightRepaint();
                const handlePause = () => {
                    stopAmbientLightRepaint();
                    setRun(false);
                };
                const handleEnded = handlePause;
                const handleSeeked = () => repaintAmbientLight();
                const handleLoad = handleSeeked;
                setRun(true)
                handlePlay()
                video.addEventListener('loadeddata', () => {
                    setRun(true)
                });
                video.addEventListener("play", handlePlay);
                video.addEventListener("pause", handlePause);
                video.addEventListener("ended", handleEnded);
                video.addEventListener("seeked", handleSeeked);
                video.addEventListener("load", handleLoad);

                return () => {
                    video.removeEventListener("play", handlePlay);
                    video.removeEventListener("pause", handlePause);
                    video.removeEventListener("ended", handleEnded);
                    video.removeEventListener("seeked", handleSeeked);
                    video.removeEventListener("load", handleLoad);
                };
            } else {
                repaintAmbientLight()
                block.addEventListener("load", () => repaintAmbientLight());
            }
        }
    },[mediaBlock.current])
    useLayoutEffect(() => {
        if (mediaBlock.current) {
            mediaBlock.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
        }
    },[])
    return (
        <div className='relative w-full z-20 aspect-[4/3] max-w-full flex items-center justify-center'>
            <div className={'absolute flex items-center justify-center light_wrapper h-full max-w-full opacity-60'}>
                <MotionConfig transition={{ type: 'spring', duration: 400 }}>
                    <motion.canvas initial={{ opacity: .25 }} animate={{ opacity: .75 }} style={{ transitionDuration: '3000ms' }}
                    ref={canvas} className={`ambientLight aspect-[4/3] z-[-1] scale-110 w-full blur-[125px]`} onLoad={() => repaintAmbientLight()} />
                    <motion.canvas initial={{ opacity: .25 }} animate={{ opacity: 1 }} style={{ transitionDuration: '3000ms' }}
                    ref={bgCanvas} className={`ambientLight aspect-[4/3] z-[-2] scale-125 w-full blur-[125px]`} onLoad={() => repaintBgCanvas()} />
                </MotionConfig>
            </div>
            {
                isVideo
                ? <video ref={mediaBlock as LegacyRef<HTMLVideoElement>} autoPlay muted loop className="z-10 object-cover w-full h-full rounded-2xl">
                    <source src={link} />
                </video>
                : <Image ref={mediaBlock as MutableRefObject<HTMLImageElement>} src={link} fill className="z-10 object-cover rounded-2xl" alt='img' />
            }
        </div>
    )
}

const Ambient = memo(AmbientLight)
export { Ambient }
