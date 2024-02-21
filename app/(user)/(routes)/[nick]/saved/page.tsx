import { redirect } from "next/navigation"

type Props = {
    params: {
        nick: string
    }
}
const page = async ({ params }: Props) => {
    const { nick } = params
    return redirect(`/${nick}`)
}

export default page