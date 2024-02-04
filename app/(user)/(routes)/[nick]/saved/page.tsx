import { redirect } from "next/navigation"

type Props = {
    params: {
        nick: string
    }
}
const page = async({ params }: Props) => {
    const { nick } = params
    // const portfolio = await getPortfolio(nick)
    // const saved = config && config.data.type === 'user' ? await bum.author.saved(config.data.uid) : []
    return redirect(`/${nick}`)
    // return (
        // <>
            {/* <div className="w-full px-6 min-h-[17rem] py-24 max-w-screen-2xl mx-auto"> */}
                {/* <div className="z-20 grid w-full h-full gap-6 shots_grid"> */}
                    {/* { */}
                        // saved.map(shot =>
                            // <Suspense key={shot.doc_id} fallback={<ShotSkeleton />}><ShotCard shot={shot} /></Suspense>
                        // )
                    // }
                {/* </div> */}
            {/* </div> */}
        {/* </> */}
    // )
}

export default page