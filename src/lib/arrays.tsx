// Helper function to safely get array
export const safeArray = (
  items: (string | undefined)[] | undefined,
): string[] => {
  if (!items) return [];
  return items.filter((item): item is string => item !== undefined);
};

// Helper function to render a list of items
export const renderList = (items: string[]) => {
  if (!items?.length) return <li className="text-gray-500">Nenhum registro</li>;
  return items.map((item, index) => (
    <li key={index} className="text-gray-700">
      {item}
    </li>
  ));
};
