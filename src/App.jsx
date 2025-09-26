import { useState } from 'react';

const THEMES = {
    1: {
        mainBg: 'hsl(222, 26%, 31%)',
        keypadBg: 'hsl(223, 31%, 20%)',
        screenBg: 'hsl(224, 36%, 15%)',
        functionKeyBg: 'hsl(225, 21%, 49%)',
        functionKeyShadow: 'hsl(224, 28%, 35%)',
        equalsKeyBg: 'hsl(6, 63%, 50%)',
        equalsKeyShadow: 'hsl(6, 70%, 34%)',
        numberKeyBg: 'hsl(0, 0%, 90%)',
        numberKeyShadow: 'hsl(28, 16%, 65%)',
        textPrimary: 'hsl(0, 100%, 100%)',
        textSecondary: 'hsl(221, 14%, 31%)',
        textEquals: 'hsl(0, 100%, 100%)',
    },
    2: {
        mainBg: 'hsl(0, 0%, 90%)',
        keypadBg: 'hsl(0, 5%, 81%)',
        screenBg: 'hsl(0, 0%, 93%)',
        functionKeyBg: 'hsl(185, 42%, 37%)',
        functionKeyShadow: 'hsl(185, 58%, 25%)',
        equalsKeyBg: 'hsl(25, 98%, 40%)',
        equalsKeyShadow: 'hsl(25, 99%, 27%)',
        numberKeyBg: 'hsl(0, 0%, 90%)',
        numberKeyShadow: 'hsl(35, 11%, 61%)',
        textPrimary: 'hsl(60, 10%, 19%)',
        textSecondary: 'hsl(60, 10%, 19%)',
        textEquals: 'hsl(0, 100%, 100%)',
    },
    3: {
        mainBg: 'hsl(268, 75%, 9%)',
        keypadBg: 'hsl(268, 71%, 12%)',
        screenBg: 'hsl(268, 71%, 12%)',
        functionKeyBg: 'hsl(281, 89%, 26%)',
        functionKeyShadow: 'hsl(285, 91%, 52%)',
        equalsKeyBg: 'hsl(176, 100%, 44%)',
        equalsKeyShadow: 'hsl(177, 92%, 70%)',
        numberKeyBg: 'hsl(268, 47%, 21%)',
        numberKeyShadow: 'hsl(290, 70%, 36%)',
        textPrimary: 'hsl(52, 100%, 62%)',
        textSecondary: 'hsl(52, 100%, 62%)',
        textEquals: 'hsl(198, 20%, 13%)',
    },
};

const OPERATIONS = ['+', '-', '×', '/'];

function ThemeToggle({ currentTheme, onThemeChange }) {
    const theme = THEMES[currentTheme];

    return (
        <div className="flex items-center gap-4">
            <span className="text-sm font-bold tracking-wide" style={{ color: theme.textPrimary }}>
                THEME
            </span>
            <div className="relative">
                <div
                    className="flex justify-between px-2 mb-1 text-xs"
                    style={{ color: theme.textPrimary }}
                >
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                </div>

                <div
                    className="relative w-16 h-6 rounded-full p-1 flex items-center"
                    style={{ backgroundColor: theme.keypadBg }}
                >
                    <div className="flex justify-between w-full px-1">
                        {[1, 2, 3].map((themeId) => (
                            <button
                                key={themeId}
                                onClick={() => onThemeChange(themeId)}
                                className="w-4 h-4 rounded-full transition-all duration-200 hover:scale-110"
                                style={{
                                    backgroundColor:
                                        currentTheme === themeId
                                            ? theme.equalsKeyBg
                                            : 'transparent',
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Header({ currentTheme, onThemeChange }) {
    return (
        <div className="flex justify-between items-end mb-8">
            <h1 className="text-3xl font-bold" style={{ color: THEMES[currentTheme].textPrimary }}>
                calc
            </h1>
            <ThemeToggle currentTheme={currentTheme} onThemeChange={onThemeChange} />
        </div>
    );
}

function Display({ value, currentTheme }) {
    const theme = THEMES[currentTheme];

    return (
        <div className="rounded-lg p-6 mb-6" style={{ backgroundColor: theme.screenBg }}>
            <div
                className="text-right text-4xl font-bold"
                style={{
                    color: theme.textPrimary,
                    fontSize: '32px',
                    lineHeight: '1.2',
                }}
            >
                {value}
            </div>
        </div>
    );
}

function Button({ children, onClick, variant = 'number', currentTheme, className = '' }) {
    const theme = THEMES[currentTheme];

    const getButtonStyles = () => {
        const baseStyles = {
            height: '64px',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '20px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.1s',
            position: 'relative',
            borderBottom: '4px solid',
            marginBottom: '4px',
        };

        const variantStyles = {
            function: {
                backgroundColor: theme.functionKeyBg,
                borderBottomColor: theme.functionKeyShadow,
                color: theme.textEquals,
            },
            equals: {
                backgroundColor: theme.equalsKeyBg,
                borderBottomColor: theme.equalsKeyShadow,
                color: theme.textEquals,
            },
            number: {
                backgroundColor: theme.numberKeyBg,
                borderBottomColor: theme.numberKeyShadow,
                color: theme.textSecondary,
            },
        };

        return { ...baseStyles, ...variantStyles[variant] };
    };

    const handleMouseDown = (e) => {
        e.target.style.transform = 'translateY(2px)';
        e.target.style.borderBottomWidth = '2px';
    };

    const handleMouseUp = (e) => {
        e.target.style.transform = 'translateY(0px)';
        e.target.style.borderBottomWidth = '4px';
    };

    return (
        <button
            className={className}
            style={getButtonStyles()}
            onClick={() => onClick?.(children)}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {children}
        </button>
    );
}

function ButtonGrid({ currentTheme, onButtonClick }) {
    const theme = THEMES[currentTheme];

    const buttonRows = [
        [
            { value: '7', variant: 'number' },
            { value: '8', variant: 'number' },
            { value: '9', variant: 'number' },
            { value: 'DEL', variant: 'function' },
        ],
        [
            { value: '4', variant: 'number' },
            { value: '5', variant: 'number' },
            { value: '6', variant: 'number' },
            { value: '+', variant: 'number' },
        ],
        [
            { value: '1', variant: 'number' },
            { value: '2', variant: 'number' },
            { value: '3', variant: 'number' },
            { value: '-', variant: 'number' },
        ],
        [
            { value: '.', variant: 'number' },
            { value: '0', variant: 'number' },
            { value: '/', variant: 'number' },
            { value: '×', variant: 'number' },
        ],
    ];

    return (
        <div className="rounded-lg p-6" style={{ backgroundColor: theme.keypadBg }}>
            <div className="grid grid-cols-4 gap-4">
                {buttonRows.flat().map((button, index) => (
                    <Button
                        key={index}
                        currentTheme={currentTheme}
                        onClick={onButtonClick}
                        variant={button.variant}
                    >
                        {button.value}
                    </Button>
                ))}

                <Button
                    currentTheme={currentTheme}
                    onClick={onButtonClick}
                    variant="function"
                    className="col-span-2"
                >
                    RESET
                </Button>

                <Button
                    currentTheme={currentTheme}
                    onClick={onButtonClick}
                    variant="equals"
                    className="col-span-2"
                >
                    =
                </Button>
            </div>
        </div>
    );
}

function useCalculator() {
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState(null);
    const [operation, setOperation] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const calculate = (firstValue, secondValue, operation) => {
        const operations = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '×': (a, b) => a * b,
            '/': (a, b) => a / b,
        };

        return operations[operation]?.(firstValue, secondValue) || secondValue;
    };

    const inputNumber = (num) => {
        if (waitingForOperand) {
            setDisplay(String(num));
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? String(num) : display + num);
        }
    };

    const inputOperation = (nextOperation) => {
        const inputValue = parseFloat(display);

        if (previousValue === null) {
            setPreviousValue(inputValue);
        } else if (operation) {
            const currentValue = previousValue || 0;
            const newValue = calculate(currentValue, inputValue, operation);
            setDisplay(String(newValue));
            setPreviousValue(newValue);
        }

        setWaitingForOperand(true);
        setOperation(nextOperation);
    };

    const reset = () => {
        setDisplay('0');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(false);
    };

    const deleteLast = () => {
        if (display.length > 1) {
            setDisplay(display.slice(0, -1));
        } else {
            setDisplay('0');
        }
    };

    const equals = () => {
        if (previousValue !== null && operation) {
            const inputValue = parseFloat(display);
            const newValue = calculate(previousValue, inputValue, operation);
            setDisplay(String(newValue));
            setPreviousValue(null);
            setOperation(null);
            setWaitingForOperand(true);
        }
    };

    const addDecimal = () => {
        if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };

    const handleInput = (value) => {
        const actions = {
            RESET: reset,
            DEL: deleteLast,
            '=': equals,
            '.': addDecimal,
        };

        if (actions[value]) {
            actions[value]();
        } else if (OPERATIONS.includes(value)) {
            inputOperation(value);
        } else {
            inputNumber(value);
        }
    };

    const formatDisplay = (value) => {
        if (value.length > 3 && !value.includes('.')) {
            return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        return value;
    };

    return {
        display: formatDisplay(display),
        handleInput,
    };
}

export default function Calculator() {
    const [currentTheme, setCurrentTheme] = useState(1);
    const { display, handleInput } = useCalculator();

    return (
        <div
            className="min-h-screen flex items-center justify-center p-6"
            style={{
                backgroundColor: THEMES[currentTheme].mainBg,
                fontFamily: '"League Spartan", sans-serif',
            }}
        >
            <div
                className="w-full max-w-sm mx-auto font-bold"
                style={{
                    minWidth: '320px',
                    maxWidth: '400px',
                }}
            >
                <Header currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
                <Display value={display} currentTheme={currentTheme} />
                <ButtonGrid currentTheme={currentTheme} onButtonClick={handleInput} />
            </div>
        </div>
    );
}
