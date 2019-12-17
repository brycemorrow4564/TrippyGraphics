import React, { useEffect, useState } from "react"; 
import { Row, Col, Input, Form, Button } from "antd"; 
import { useRootContext } from "../../context/context"; 

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function SaveByNameFormFactory(formName) {
    
    function SaveByNameForm(props) {
    
        /*
        Allow user to name and save current static configuration
        */
        const { form, placeholder } = props; 
        const { state, dispatch } = useRootContext(); 
        const [firstRender, setFirstRender] = useState(true); 
    
        useEffect(() => {
            // indicate first render has occurred 
            setFirstRender(true); 
        }, []); 
    
        useEffect(() => {
            // Disable submit at the beginning as user has not yet entered input
            form.validateFields();
        }, []); 
    
        let handleSubmit = e => {
            e.preventDefault();
            form.validateFields((err, values) => {
                let formIsValid = !err; 
                if (formIsValid) {
                    let { name } = values; 
                    // TODO: dispatch creation of new confguration here 
                }
            });
        };
    
        // Only show error after a field is touched.
        const configNameError = form.isFieldTouched('name') && form.getFieldError('name');
    
        return (
            <Row>
                <Col>
                    <Form layout="inline" onSubmit={handleSubmit}>
    
                        {/* Input for name of new configuration */}
                        <Form.Item 
                        validateStatus={configNameError ? 'error' : ''} 
                        help={configNameError || ''}
                        >
                            {form.getFieldDecorator('name', {
                                rules: [
                                    { required: true, message: 'Enter a non-empty name' }
                                ],
                            })(
                                <Input 
                                style={{ width: 250 }}
                                placeholder={placeholder}
                                maxLength={25}
                                allowClear
                                />
                            )}
                        </Form.Item>
    
                        {/* Submit Button */}
                        <Form.Item>
                            <Button 
                            type="primary" 
                            htmlType="submit" 
                            ghost 
                            disabled={firstRender || hasErrors(form.getFieldsError())}
                            >
                                Save
                            </Button>
                        </Form.Item>
    
                    </Form>
                </Col>
            </Row>
        ); 
    
    }
    
    return Form.create({ name: formName })(SaveByNameForm);

};

export default SaveByNameFormFactory; 