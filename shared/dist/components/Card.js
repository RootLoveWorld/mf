import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Card = ({ title, children, className = '' }) => {
    return (_jsxs("div", { className: `bg-white rounded-lg shadow-md p-6 ${className}`, children: [title && _jsx("h3", { className: "text-lg font-semibold mb-4", children: title }), children] }));
};
