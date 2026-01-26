import { 
  Atom, 
  FileCode, 
  Triangle, 
  Palette, 
  Layers, 
  Figma, 
  Sparkles, 
  Component, 
  Hexagon, 
  Database, 
  Server, 
  Route, 
  Share2, 
  Radio, 
  ArrowRightLeft, 
  Leaf, 
  Zap, 
  Container, 
  Network, 
  Cloud, 
  GitBranch, 
  Package, 
  Bolt, 
  Search,
  LucideIcon
} from 'lucide-react';
import { CSSProperties } from 'react';

const iconMap: Record<string, LucideIcon> = {
  'atom': Atom,
  'file-code': FileCode,
  'triangle': Triangle,
  'palette': Palette,
  'layers': Layers,
  'figma': Figma,
  'sparkles': Sparkles,
  'component': Component,
  'hexagon': Hexagon,
  'database': Database,
  'server': Server,
  'route': Route,
  'share-2': Share2,
  'radio': Radio,
  'arrow-right-left': ArrowRightLeft,
  'leaf': Leaf,
  'zap': Zap,
  'container': Container,
  'network': Network,
  'cloud': Cloud,
  'git-branch': GitBranch,
  'package': Package,
  'bolt': Bolt,
  'search': Search,
};

interface TechIconProps {
  name: string;
  className?: string;
  style?: CSSProperties;
}

export const TechIcon = ({ name, className = '', style }: TechIconProps) => {
  const Icon = iconMap[name] || Atom;
  return <Icon className={className} style={style} />;
};
