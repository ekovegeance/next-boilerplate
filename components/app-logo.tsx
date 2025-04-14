
import AppLogoIcon from "@/components/app-logo-icon";
export default function AppLogo() {
  return (
    <>
      <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
        <AppLogoIcon className="dark:text-primary-foreground size-4" />
      </div>
      <div className="ml-1 grid flex-1 text-left text-sm">
        <span className="mb-0.5 truncate leading-none font-semibold">
          Next Boilerplate
        </span>
      </div>
    </>
  );
}
