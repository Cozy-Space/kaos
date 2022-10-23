import {TableCell} from "./TableCell";
import {Column} from "./Table";
import {Checkbox} from "./Checkbox";

interface TableHeadProps{
    columns: Column[]
}

export function TableHead({columns}: TableHeadProps){
    return(
        <thead >
            <tr className={'border-b border-slate-200 bg-slate-200'}>
                <td className={'pl-4'}>
                    <Checkbox value={false} onChange={() => {}}/>
                </td>
                {columns.map((column: Column, key: number) => <TableCell key={key} value={column.displayName} type='head' />)}
                <TableCell type={'head'} value={'Actions'}/>
            </tr>
        </thead>
    )
}