// Table.js
import React from 'react';

const Table = ({ data, type, onDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    {Object.keys(data[0] || {}).map((key) => (
                        <th key={key}>{key}</th>
                    ))}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item._id}>
                        {Object.values(item).map((value, idx) => (
                            <td key={idx}>{value}</td>
                        ))}
                        <td>
                            <button onClick={() => onDelete(type, item._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
