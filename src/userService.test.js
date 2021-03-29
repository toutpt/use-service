import React from 'react';
import TestRenderer from 'react-test-renderer';
import { useService, registerService } from './useService';

const { act } = TestRenderer;

describe('useService.register', () => {
    it('should update component state', () => {
        let instance;
        function MyService(notify) {
            instance = this;
            this.notify = notify;
            this.count = 0
        }
        registerService('My', MyService);
        expect(instance).toBeUndefined();

        function Component() {
            const service = useService('My');
            return <p>{service.count}</p>;
        }
        const wrapper = TestRenderer.create(<Component />)
        expect(typeof instance).toBe('object')
        expect(instance.count).toBe(0);
        const structure = wrapper.toJSON();
        expect(structure.children[0]).toBe('0');

        act(() => {   
            // now lets update the service
            instance.count = 1;
            instance.notify();
        });
        expect(wrapper.toJSON().children[0]).toBe('1');
    })
})