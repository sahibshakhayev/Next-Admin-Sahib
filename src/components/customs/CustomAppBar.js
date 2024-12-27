// CustomAppBar.js
import * as React from 'react';
import {AppBar, UserMenu, Logout, useDataProvider} from 'react-admin';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import {API_BASE_URL} from "../../providers/config";


const CustomAppBar = (props) => {

    const [logoUrl, setLogoUrl] = React.useState('');

    const dataProvider = useDataProvider();

    React.useEffect(() => {
        dataProvider.getList('settings',{})  // Fetch the settings data
            .then(({ data }) => {

                console.log(data)

                const logo = data.find(item => item.key == 'logo');



                const fullLogoUrl = logo.value.startsWith('http')
                    ? logo.value // If already a full URL, use it
                    : `${API_BASE_URL}/${logo.value}`; // Prepend base URL

                setLogoUrl(fullLogoUrl);  // Set the full logo URL
            })
            .catch(error => {
                console.error('Error fetching logo:', error);
            });
    }, [dataProvider]);


    return(
    <AppBar  {...props} color="primary">
        <Box flex="1"  style={{alignItems:'center', flexDirection:'row', display:'flex'}}>
            {logoUrl && <img src={logoUrl} alt="Logo" style={{ height: '40px', margin: '1px' }} />}
        </Box>
        <Box flex="1">
            <Typography variant="h6" id="react-admin-title">
                {}
            </Typography>
        </Box>
    </AppBar>
)};

export default CustomAppBar;
