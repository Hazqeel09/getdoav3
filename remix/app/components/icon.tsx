import { FaGithub, FaXTwitter } from "react-icons/fa6";

type Props = {
  name: string;
  className?: string;
}

const Icon = ({ name, ...props }: Props) => {
  switch (name) {
    case "github":
      return <FaGithub {...props} />;
    case "x":
      return <FaXTwitter {...props} />;
    default:
      return null;
  }
}

export default Icon;