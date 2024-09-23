import { Accordion, AccordionItem } from "@nextui-org/react";

export const NavBar = () => {
  return (
    <div className="w-28 h-full">
      <div className="flex flex-col items-center justify-center">
        <Accordion>
          <AccordionItem>User</AccordionItem>
          <AccordionItem>User</AccordionItem>
          <AccordionItem>User</AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
