import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import CancelIcon from '@mui/icons-material/Cancel';

const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
        theme.palette.mode === 'dark'
            ? '0 0 0 1px rgb(16 22 26 / 40%)'
            : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
    backgroundImage:
        theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
            : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
    },
    'input:hover ~ &': {
        backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
    },
    'input:disabled ~ &': {
        boxShadow: 'none',
        background:
            theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
    },
}));

const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
    },
    'input:hover ~ &': {
        backgroundColor: '#106ba3',
    },
});

// Inspired by blueprintjs
function BpRadio(props) {
    return (
        <Radio
            disableRipple
            color="default"
            checkedIcon={<BpCheckedIcon />}
            icon={<BpIcon />}
            {...props}
        />
    );
}

const CustomRadioButton = ({ formik, name, index, label, handleClick, handleRemoveClick, defaultvalue }) => {

    return (
        <FormControl
            sx={{ display: 'grid', padding: '20px' }} className='md:grid-cols-6 grid-cols-2'>
            <label className={`${formik.errors[name] && formik.touched[name] && 'text-red-500 '} block col-span-4`} >
                {formik.errors[name] && formik.touched[name] && <CancelIcon fontSize='15px' className='ml-2' />}
                {++index}- {label}
            </label>
            <RadioGroup
                name="picked"
                defaultValue={defaultvalue == "دارد" ? true : defaultvalue == "ندارد" ? false : ""}
                sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gridColumn: 'span 2 / span 2', flexDirection: 'row' }}>
               <div>
                <FormControlLabel sx={{ margin: '0px', padding: '0px' }} name={name} onChange={formik.handleChange} onClick={handleClick} value={true} control={<BpRadio />} />
                <span className='md:hidden'>بله</span>
                </div>
                <div>
                <FormControlLabel sx={{ margin: '0px', padding: '0px' }} name={name} onChange={formik.handleChange} onClick={handleRemoveClick} value={false} control={<BpRadio />} />

                <span className='md:hidden'>خیر</span>
                </div>
            </RadioGroup>
        </FormControl>
    );
}

export default CustomRadioButton;