import DefaultSorting from "../../_components/general/default-sorting"
import { links, settings } from "../../_components/settings"
import SettingsLink from "../../_components/settings-link"

const page = () => {
  const general_links = links.map(link => {
    const section_settings = settings[link]
    const obj = {
      ...section_settings,
      link: link
    }
    return obj
  }).filter(link => link.link !== '')
  return (
    <div className="w-full h-fit flex flex-col py-6 gap-4">
      <DefaultSorting />
      {
        general_links.map(link =>
          <SettingsLink
            title={link.section_name}
            description={link.description}
            link={'/settings/' + link.link}
          />
        )
      }
    </div>
  )
}

export default page