import { API_URL } from "../App";
import { useQuery } from "@tanstack/react-query";
import * as XLSX from 'xlsx';
import saveAs from 'file-saver';
import "../stylesheets/productlist.css"
import { ProductDTOList } from "../dtos/ProductDTOs";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

function GetExcel() {
    const {
        data: productList,
        isLoading: isproductListLoading,
        error: productListError
    } = useQuery<ProductDTOList>({
        queryKey: ["productList"],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/products`);
            if (!response.ok) {
                throw new Error("error")
            }
            return response.json();
        },
    })

    if(isproductListLoading) return <>loading...</>
    if(productListError) return <>error</>

    const handleExport = () => {
        const worksheet = XLSX.utils.aoa_to_sheet([[]]);
        let row = 0;

        for (let i = 0; i < (productList?.length ?? 0); i++) {     
            XLSX.utils.sheet_add_aoa(worksheet, [[productList?.at(i)?.name.toUpperCase()]], { origin: { r: row, c: 0 } });
            worksheet['!merges'] = worksheet['!merges'] || [];
            worksheet['!merges'].push({ s: { r: row, c: 0 }, e: { r: row, c: 2 } });
            row++;

            const purchases = productList?.at(i)?.purchases;
            
            let totalSold = 0;
            for(let k = 0; k < (purchases?.length ?? 0); k++ ) {
                totalSold += purchases?.at(k)?.amount ?? 0;
            }
            XLSX.utils.sheet_add_aoa(
                worksheet,
                [[productList?.at(i)?.price, totalSold, { f: `A${row + 1}*B${row + 1}` } ]],
                { origin: { r: row, c: 0 } }
            );
            worksheet[XLSX.utils.encode_cell({ r: row, c: 0 })].z = "€#,##0.00";
            worksheet[XLSX.utils.encode_cell({ r: row, c: 1 })].z = '0" sold"';
            worksheet[XLSX.utils.encode_cell({ r: row, c: 2 })].z = '€#,##0.00" total"';
            row++;

            for(let j = 0; j < (purchases?.length ?? 0); j++) {
                XLSX.utils.sheet_add_aoa(
                    worksheet,
                    [[purchases?.at(j)?.amount, (purchases?.at(j)?.amount ?? 0) * (productList?.at(i)?.price ?? 0), purchases?.at(j)?.status]],
                    { origin: { r: row + j, c: 0 } }
                );
                worksheet[XLSX.utils.encode_cell({ r: row + j, c: 1 })].z = "€#,##0.00";;
            }
            row += (purchases?.length ?? 0) + 1;
        }

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const wbout = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });

        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        const currentDate = new Date();
        const name = currentDate.getFullYear() + " " +
            monthNames[currentDate.getMonth()] + " " +
            currentDate.getDate() +
            ".xlsx";
        saveAs(blob, name);
    };

    return (
        <button onClick={handleExport} className="admin-button">Download Financial Overview</button>
    );
}

export default GetExcel;