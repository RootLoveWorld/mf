import { jsx as _jsx } from "react/jsx-runtime";
export const Button = ({ children, onClick, variant = 'primary', disabled = false }) => {
    const baseStyles = 'px-4 py-2 rounded font-medium transition-colors';
    const variantStyles = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100'
    };
    return (_jsx("button", { className: `${baseStyles} ${variantStyles[variant]}`, onClick: onClick, disabled: disabled, children: children }));
};
