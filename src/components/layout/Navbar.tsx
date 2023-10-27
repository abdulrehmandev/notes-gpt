import Link from "next/link";
import Container from "../ui/Container";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/Button";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <header className="w-full">
      <Container>
        <div className="flex items-center justify-between py-4">
          <span>NotesGPT</span>
          <div className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="font-medium text-sm hover:opacity-60"
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              className="font-medium text-sm hover:opacity-60"
            >
              Login
            </Link>
            <Link href="/signup" className={cn(buttonVariants({ size: "sm" }))}>
              Signup
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
