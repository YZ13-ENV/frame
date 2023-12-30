import Bio from "@/components/widgets/Bio"

type Props = {
    params: {
        nickname: string
    }
}
const UserBio = ({ params }: Props) => {
    return (
        <section className='flex flex-col w-full max-w-5xl gap-4 mx-auto my-auto overflow-y-auto h-fit shot_wrapper md:flex-row'>
            <Bio uid={params.nickname} />
        </section>
    )
}

export default UserBio