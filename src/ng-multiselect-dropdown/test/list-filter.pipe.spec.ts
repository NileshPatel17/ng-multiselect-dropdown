import { ListFilterPipe } from '../src/list-filter.pipe'
describe('multiSelectFilter', () => {
    let pipe: ListFilterPipe;
    beforeEach(() => {
        pipe = new ListFilterPipe();
    })
    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });
    it('bad inputs:should return source data if filter data is null', () => {
        const sourceData = [
            {
                id: 1, text: 'Navsari'
            }, {
                id: 2, text: 'Pune'
            }];
        expect(pipe.transform(sourceData, null)).toEqual(sourceData);
    })
    it('transform string data', () => {
        const sourceData = [
            {
                id: 1, text: 'Navsari'
            }, {
                id: 2, text: 'Pune'
            }];
        const filterData = { id: 1, text: 'Nav' };
        const expectedData = [{ id: 1, text: 'Navsari' }]
        expect(pipe.transform(sourceData, filterData)).toEqual(expectedData);
    })
    it('transform numbers data', () => {
        const sourceData = [
            {
                id: 1111, text: 1111
            }, {
                id: 2222, text: 2222
            }];
        const filterData = { id: 1111, text: 1111 };
        const expectedData = [{ id: 1111, text: 1111 }]
        expect(pipe.transform(sourceData, filterData)).toEqual(expectedData);
    })
})