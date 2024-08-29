import { renderHook, act } from '@testing-library/react';
import useBaseMultiSelectInputHook from "./base.multi.select.input.hook";

describe('useBaseMultiSelectInputHook', () => {
    test('should initialize isOpen as false', () => {
        const { result } = renderHook(() => useBaseMultiSelectInputHook());

        expect(result.current.isOpen).toBe(false);
    });

    test('should update isOpen when setIsOpen is called', () => {
        const { result } = renderHook(() => useBaseMultiSelectInputHook());

        act(() => {
            result.current.setIsOpen(true);
        });

        expect(result.current.isOpen).toBe(true);

        act(() => {
            result.current.setIsOpen(false);
        });

        expect(result.current.isOpen).toBe(false);
    });
});
