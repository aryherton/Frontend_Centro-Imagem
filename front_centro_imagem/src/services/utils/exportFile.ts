import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const exportToXLS = (data: any, filename: string) => {
  console.log('Estrutura de dados recebida >>>', data);
  const ws = utils.json_to_sheet(data.body, {
    header: data.head,
  });
  const wb = utils.book_new();

  utils.book_append_sheet(wb, ws, 'Sheet1');

  writeFile(wb, `${filename}.xlsx`);
};

const exportToPDF = (data: any, filename: string) => {
  const doc = new jsPDF();
  doc.text('Tabela solicitações exames UNIMED', 10, 10);

  (doc as any).autoTable({ head: [Object.keys(data[0])], body: data });

  doc.save(`${filename}.pdf`);
};

export { exportToXLS, exportToPDF };