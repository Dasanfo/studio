'use client';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  Home,
  GitCompareArrows,
  BrainCircuit,
  Spline,
  Rocket,
  Beaker,
  Grape,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/compare-models', label: 'Compare Models', icon: GitCompareArrows },
  { href: '/models/cnn', label: 'CNN Model', icon: BrainCircuit },
  { href: '/models/svm', label: 'SVM Model', icon: Spline },
  { href: '/models/boosting', label: 'Boosting Model', icon: Rocket },
  { href: '/live-test', label: 'Live Test', icon: Beaker },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="items-center justify-center text-center">
        <div className="flex items-center gap-2 font-headline text-lg font-semibold text-primary">
            <Grape className="h-6 w-6" />
            <span className="duration-200 group-data-[collapsible=icon]:hidden">
                FruitVision
            </span>
        </div>
      </SidebarHeader>
      <SidebarMenu>
        {links.map((link) => (
          <SidebarMenuItem key={link.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === link.href || (link.href.startsWith('/models') && pathname.startsWith(link.href))}
              tooltip={{ children: link.label }}
            >
              <Link href={link.href}>
                <link.icon />
                <span>{link.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </Sidebar>
  );
}

export function MobileSidebarTrigger() {
    return (
        <div className="md:hidden">
            <SidebarTrigger />
        </div>
    )
}
