export class FormValidator{
    public static validate = (formData: FormData, inputs: IFormInput[]) : boolean => {
        for (const [key, val] of formData.entries()) {
            const input = inputs.find(v => v.name == key);
            if(!input)
                continue;
            if(!input.validate(val)){
                input.onerror(input.error);
                return false
            }
        }
        return true;
    }
}

export default interface IFormInput{
    name: string,
    validate: (val: any) => boolean,
    error: string,
    onerror: (err: string) => void
}