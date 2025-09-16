import { cloneElement, createContext, isValidElement, useContext, useState } from "react";

const TTContext = createContext<{ open: boolean; setOpen: (o:boolean)=>void } | null>(null);

export function TooltipProvider({ children }:{ children: React.ReactNode }) { 
  return (
    <>
      {children}
    </>
  ) 
}

export function Tooltip({ children }:{ children: React.ReactNode }){
  const [open, setOpen] =useState(false);
  return (
    <TTContext.Provider value={{ open, setOpen }}>
      {children}
    </TTContext.Provider>
  )
}

export function TooltipTrigger({ asChild, children }:{ asChild?: boolean; children: React.ReactElement }){
  const ctx = useContext(TTContext)!;
  const props = { onMouseEnter: ()=>ctx.setOpen(true), onMouseLeave: ()=>ctx.setOpen(false) };
  return asChild && isValidElement(children) ? cloneElement(children, props) : <span {...props}>{children}</span>;
}