import { List, Edit, Create, SimpleForm, TextInput, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';

export const SettingList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="key" />
            <TextField source="value" />
            <EditButton basePath="/settings" />
            <DeleteButton basePath="/settings" />
        </Datagrid>
    </List>
);

export const SettingEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="key" />
            <TextInput source="value" />
        </SimpleForm>
    </Edit>
);

export const SettingCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="key" required />
            <TextInput source="value" required />
        </SimpleForm>
    </Create>
);
