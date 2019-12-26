import React from "react";
import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    Edit,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,
    Create
} from 'react-admin';

export const BookList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="author" />
            <ReferenceField source="borrow_member_id" reference="members">
                <TextField source="name" />
            </ReferenceField>
            <EditButton/>
        </Datagrid>
    </List>
);

export const BookEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="title" />
            <TextInput source="author" />
            <ReferenceInput source="borrow_member_id" reference="members" allowEmpty>
                <SelectInput optionText="name" resettable/>
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const BookCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="author" />
            <ReferenceInput source="borrow_member_id" reference="members" allowEmpty>
                <SelectInput optionText="name" resettable/>
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
