import { SIDENAV_INPUT_ID } from "../../config"

const SidenavToggle = () => {
  return (
    <input
      type="checkbox"
      id={SIDENAV_INPUT_ID}
      className="peer hidden"
      onChange={e => {
        const isChecked = e.target.checked
        if (isChecked) {
          document.body.style.overflow = "hidden"
        } else {
          document.body.style.overflow = "auto"
        }
      }}
    />
  )
}
export default SidenavToggle
