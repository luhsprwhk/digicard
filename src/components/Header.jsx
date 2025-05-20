import ThemeSwitch from "./ThemeSwitch";

const Header = ({ theme, setTheme }) => {

  // Don't show the toggle at all in matrix mode
  if (theme === 'matrix') {
    return <header className="mb-5" />;
  }

  return (
    <header className="flex justify-end mb-5">
      <div className="relative text-rleft">
        <label>
          <small>Site Theme</small>
        </label>
        <br />
        <ThemeSwitch theme={theme} setTheme={setTheme} />
      </div>
    </header>
  )
}



export default Header