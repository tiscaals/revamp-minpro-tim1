import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { SyntheticEvent, useState } from 'react';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function AccordionLandingPage() {

    const [expanded, setExpanded] = useState<string | false>('panel1');

    const handleChange =
      (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
      };
  

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Syarat Untuk Mengikuti Bootcamp</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Syarat mengikuti bootcamp adalah kamu sudah lulus minimal D3/S1, jurusan informatika/matematika/fisika/komputer/SI, sedang tidak bekerja, siap mengikuti ikatan dinas
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Tahapan mengikuti bootcamp</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Pertama kamu harus daftar dulu di situs kami dan pilih bootcamp yang kamu inginkan, lalu kamu akan mengikuti filtering test, lalu interview, legal contract dan kamu siap join bootcamp
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Kak, fasilitasnya apa saja selama mengikuti bootcamp</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Untuk yang bootcamp offline, kamu akan belajar di sentul bogor, suasana seperti villa, kamu menginap disana selama 3 bulan, makan gratis 3x sehari, peralatan mandi, mesin cuci, tempat nongkrong, enak deh pokoknya, kamu bisa lebih konsen belajar
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Kak, ijazah di tahan ga ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Ijazah kami simpan, dan pasti aman, kami kembalikan jika sudah menjalani ikatan dinas selama 2 tahun
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}