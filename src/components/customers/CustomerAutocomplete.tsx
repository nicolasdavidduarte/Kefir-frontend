import { useState, useEffect, useRef } from "react";
import * as React from "react";
import { fetchCustomersByNameOrDocument } from "../../api/customersApi.ts";
import type { Customer } from "../../types/Customer.ts";

type CustomerAutocompleteProps = {
    onSelect: (customerId: number | null) => void;
    disabled?: boolean;
};

export default function CustomerAutocomplete({ onSelect, disabled }: CustomerAutocompleteProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    // Agregamos un flag para saber si el usuario está tipeando o si ya seleccionó
    const isSelectedRef = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        // Si ya seleccionamos un cliente, no disparamos la búsqueda de la API por el cambio de query
        if (isSelectedRef.current || query.trim().length < 3) return;

        const delayDebounceFn = setTimeout(async () => {
            try {
                setLoading(true);
                const data = await fetchCustomersByNameOrDocument(query);
                setResults(data);
                setShowDropdown(true);
            } catch (err) {
                console.error("Error fetching customers", err);
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const handleSelect = (customer: Customer) => {
        isSelectedRef.current = true; // Bloqueamos efectos secundarios de tipeo
        const fullName = `${customer.name1} ${customer.lastname1} (${customer.documentType}: ${customer.documentNumber})`;

        setQuery(fullName);
        setResults([]);
        setShowDropdown(false);

        onSelect(customer.id ?? null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        isSelectedRef.current = false; // El usuario volvió a escribir, desbloqueamos
        setQuery(value);

        if (value.trim() === "") {
            setResults([]);
            setShowDropdown(false);
            onSelect(null);
        } else if (value.trim().length < 3) {
            setResults([]);
            setShowDropdown(false);
        }
    };

    return (
        <div ref={containerRef} style={localStyles.autocompleteContainer}>
            <input
                type="text"
                style={localStyles.input}
                placeholder="Search by name or document number... (mín. 3 characters)"
                value={query}
                onChange={handleInputChange}
                onFocus={() => !isSelectedRef.current && query.trim().length >= 3 && setShowDropdown(true)}
                disabled={disabled}
            />

            {loading && <div style={localStyles.loadingIndicator}>Searching...</div>}

            {showDropdown && results.length > 0 && (
                <ul style={localStyles.dropdown}>
                    {results.map((customer) => (
                        <li
                            key={customer.id}
                            // Usamos onMouseDown y prevenimos el default para que el input no pierda el foco de golpe
                            onMouseDown={(e) => {
                                e.preventDefault();
                                handleSelect(customer);
                            }}
                            style={localStyles.dropdownItem}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f2f6")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
                        >
                            <span style={localStyles.customerName}>
                                {customer.name1} {customer.name2 || ""} {customer.lastname1}
                            </span>
                            <span style={localStyles.customerDoc}>
                                {customer.documentType}: {customer.documentNumber}
                            </span>
                        </li>
                    ))}
                </ul>
            )}

            {showDropdown && query.trim().length >= 3 && results.length === 0 && !loading && (
                <div style={localStyles.noResults}>No customers found</div>
            )}
        </div>
    );
}

const localStyles: { [key: string]: React.CSSProperties } = {
    autocompleteContainer: { position: 'relative', width: '100%' },
    input: { padding: '10px 14px', borderRadius: '6px', border: '1px solid #dcdde1', fontSize: '14px', color: '#2c3e50', backgroundColor: '#fcfcfc', outline: 'none', boxSizing: 'border-box', width: '100%' },
    loadingIndicator: { position: 'absolute', right: '12px', top: '12px', fontSize: '12px', color: '#7f8c8d' },
    dropdown: { position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#ffffff', border: '1px solid #dcdde1', borderRadius: '6px', marginTop: '4px', padding: 0, listStyle: 'none', maxHeight: '200px', overflowY: 'auto', zIndex: 1000, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    dropdownItem: { padding: '10px 14px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f2f6', fontSize: '13px' },
    customerName: { fontWeight: '500', color: '#2c3e50' },
    customerDoc: { fontSize: '11px', color: '#7f8c8d', backgroundColor: '#f1f2f6', padding: '2px 6px', borderRadius: '4px' },
    noResults: { position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#ffffff', border: '1px solid #dcdde1', borderRadius: '6px', marginTop: '4px', padding: '10px 14px', fontSize: '13px', color: '#7f8c8d', zIndex: 1000 }
};