import {useInstance, createRef} from 'intact';
import type {Slider} from './';
import {useDraggable as useBaseDraggable} from '../../hooks/useDraggable';
import {State} from '../../hooks/useState';
import type {Value} from './useValue';

export function useDraggable(
    showValue: State<Value>,
    getFixedValue: (value: Value) => Value,
    setValue: (value: Value) => void,
) {
    const instance = useInstance() as Slider;
    const trackRef = createRef<HTMLDivElement>();
    const firstThumbRef = createRef<HTMLDivElement>();
    const secondThumbRef = createRef<HTMLDivElement>();
    let isFirst = true;

    const {start, dragging} = useBaseDraggable({
        onMove(e) {
            const tempValue = getNewValue(getSlidingValue(e.clientX));
            const fixedValue = getFixedValue(tempValue);
            showValue.set(tempValue);
            setValue(fixedValue);
        },

        onEnd(e) {
            (isFirst ? firstThumbRef.value : secondThumbRef.value)!.blur();
            showValue.set(instance.get('value')!);
        }
    });

    function onStart(_isFirst: boolean, e: MouseEvent) {
        if (instance.get('disabled')) return;

        isFirst = _isFirst;

        start(e);
    }

    function getSlidingValue(pos: number): number {
        const rect = trackRef.value!.getBoundingClientRect();
        const percent = (pos - rect.left) / rect.width;
        const {max, min} = instance.get();
        const sliderWidth = max! - min!;

        if (percent <= 0) {
            return min!;
        } else if (percent >= 1) {
            return max!;
        } else {
            return min! + sliderWidth * percent;
        }
    }

    function getNewValue(value: number): Value {
        const {isRange, value: oldValue} = instance.get();

        if (!isRange) return value;

        const [min, max] = oldValue as [number, number];
        if (isFirst) {
            if (value > max) {
                // exchange the thumb
                isFirst = false;
                firstThumbRef.value!.blur();
                secondThumbRef.value!.focus();
                return [max, value]; 
            } else {
                return [value, max];
            }
        } else {
            if (value < min) {
                // exchange the thumb
                isFirst = true;
                firstThumbRef.value!.focus();
                secondThumbRef.value!.blur();
                return [value, min];
            } else {
                return [min, value];
            }
        }
    }

    return {onStart, dragging, trackRef, firstThumbRef, secondThumbRef};
}
