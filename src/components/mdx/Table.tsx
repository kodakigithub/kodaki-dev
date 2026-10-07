interface TableProps {
  data: {
    headers: string[];
    rows: string[][];
  };
}

export function Table({ data }: TableProps) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-purple-800/30">
            {data.headers.map((header, index) => (
              <th key={index} className="p-2 text-left text-purple-300 font-mono">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-purple-800/30">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="p-2 text-left text-zinc-300 font-mono">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 