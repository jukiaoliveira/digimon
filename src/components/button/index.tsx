import './index.css';

interface ButtonProps {
  text: string;
}

function Button({ text }: ButtonProps) {
  return <button>{text}</button>
}
export { Button }
