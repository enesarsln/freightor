import * as Yup from 'yup';
import { useMemo, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
// _mock
import { _roles } from 'src/_mock';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
// types
import { IJobItem } from 'src/types/job';
import { TextField, Typography } from '@mui/material';
import axios from 'axios';

// ----------------------------------------------------------------------

type Props = {
  currentJob?: IJobItem;
};

export default function JobNewEditForm({ currentJob }: Props) {
  // const { enqueueSnackbar } = useSnackbar();
  const [isShowFlightInfo, setIsShowFlightNo] = useState(false);
  const [weightAllowance, setWeightAllowance] = useState(0);

  const NewJobSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    employmentTypes: Yup.array().min(1, 'Choose at least one option'),
    role: Yup.string().required('Role is required'),
    skills: Yup.array().min(1, 'Choose at least one option'),
    workingSchedule: Yup.array().min(1, 'Choose at least one option'),
    benefits: Yup.array().min(1, 'Choose at least one option'),
    locations: Yup.array().min(1, 'Choose at least one option'),
    expiredDate: Yup.mixed<any>().nullable().required('Expired date is required'),
    salary: Yup.object().shape({
      type: Yup.string(),
      price: Yup.number().min(1, 'Price is required'),
      negotiable: Yup.boolean(),
    }),
    experience: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentJob?.title || '',
      content: currentJob?.content || '',
      employmentTypes: currentJob?.employmentTypes || [],
      experience: currentJob?.experience || '1 year exp',
      role: currentJob?.role || _roles[1],
      skills: currentJob?.skills || [],
      workingSchedule: currentJob?.workingSchedule || [],
      locations: currentJob?.locations || [],
      benefits: currentJob?.benefits || [],
      expiredDate: currentJob?.expiredDate || null,
      salary: currentJob?.salary || {
        type: 'Hourly',
        price: 0,
        negotiable: false,
      },
    }),
    [currentJob]
  );

  const methods = useForm({
    resolver: yupResolver(NewJobSchema),
    defaultValues,
  });

  const {
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentJob) {
      reset(defaultValues);
    }
  }, [currentJob, defaultValues, reset]);

  const getFlightInfo = () => {
    setIsShowFlightNo(true);
  };

  const sendBaggage = () => {
    const data = {
      '@context': {
        cargo: 'https://onerecord.iata.org/ns/cargo#',
      },
      '@type': 'cargo:Shipment',
      'cargo:goodsDescription': 'Shipment of 250 iPhone PRO 14',
      'cargo:totalGrossWeight': {
        '@type': 'cargo:Value',
        'cargo:unit': 'KG',
        'cargo:numericalValue': 25,
      },
      'cargo:totalDimensions': {
        'cargo:height': {
          '@type': 'cargo:Value',
          'cargo:unit': 'M',
          'cargo:numericalValue': 3,
        },
        'cargo:length': {
          '@type': 'cargo:Value',
          'cargo:unit': 'M',
          'cargo:numericalValue': 7,
        },
        'cargo:width': {
          '@type': 'cargo:Value',
          'cargo:unit': 'M',
          'cargo:numericalValue': 4.8,
        },
        'cargo:volume': {
          '@type': 'cargo:Value',
          'cargo:unit': 'MC',
          'cargo:numericalValue': 100,
        },
      },
      'cargo:shipmentOfPieces': [
        {
          '@id': 'http://localhost:8080/logistics-objects/de68c9de-028a-474b-bcd7-6ced55060ad7',
        },
      ],
      'cargo:involvedParties': [
        {
          '@type': 'cargo:Party',
          'cargo:role': 'Shipper',
          'cargo:organization': {
            '@id': 'http://localhost:8080/logistics-objects/_data-holder',
          },
        },
      ],
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/logistics-objects',
      headers: {
        'Content-Type': 'application/ld+json; version=2.0.0-dev',
        Accept: 'application/ld+json; version=2.0.0-dev',
        Authorization:
          'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJGYzdaSHZUNGozbldNenZkX2xuYUsySGZWWnUtYWtBLTB0TGMwLVgwc1BZIn0.eyJleHAiOjE3MjgxOTE3NjgsImlhdCI6MTcyODE1NTc2OCwianRpIjoiNmQ2YzY2OTUtZmZhYS00YzEzLWEzZDctMjdiNWQ0YmYwN2U4IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4OTg5L3JlYWxtcy9uZW9uZSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIwYWU4OThmMy1kMjQ4LTRlYWMtODY4MS1iMDM4MWM4MmQ2YzAiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJuZW9uZS1jbGllbnQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1uZW9uZSIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiY2xpZW50SG9zdCI6IjE5Mi4xNjguNjUuMSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibG9naXN0aWNzX2FnZW50X3VyaSI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9sb2dpc3RpY3Mtb2JqZWN0cy9fZGF0YS1ob2xkZXIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtbmVvbmUtY2xpZW50IiwiY2xpZW50QWRkcmVzcyI6IjE5Mi4xNjguNjUuMSIsImNsaWVudF9pZCI6Im5lb25lLWNsaWVudCJ9.muTCw530NMmX8CUd4CALcmDmNpM_Yw1YkfJPEzCaFdPCBiSqbIVcxPD0F76S2Q7ZPkQ0ozZJXCzK0EowRNI56ZZLct3vLzF17YuqGOexZ9lFZ-wGHMyTovrsD51hlq8KQVTn8MBr6hmfwyCy6ZX9MYVDKakbeu8GEFW2cyutcJwNsOUSVUSREZmr1URHkQVhkbhYtsLd6HglQ4ip5YgcOLc577zwrPuQh_KC_9T1H8JRwfZH26_ZZFzui3CzrFBOdbLXhKkIqwE_v_fbINwnR82WhNO3gHKoWifu9QNkxmvKmvKGGDIw20I3zY0n4G2JtUboRxVGYatDDGtZDTZjGQ',
      },
      data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <FormProvider methods={methods}>
      <Card>
        <Stack spacing={3} sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid xs={6}>
              <RHFTextField name="pnr" label="PNR No" />
            </Grid>
            <Grid xs={6}>
              <RHFTextField name="surname" label="Surname" />
            </Grid>
          </Grid>
        </Stack>

        <LoadingButton
          variant="contained"
          size="medium"
          loading={isSubmitting}
          onClick={getFlightInfo}
          sx={{ mr: 2, mb: 2, float: 'right' }}
          color="primary"
        >
          Search
        </LoadingButton>
      </Card>

      {isShowFlightInfo && (
        <>
          <Card sx={{ mt: 2 }}>
            <Stack spacing={3} sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid xs={4}>
                  <Typography variant="subtitle2">Flight No</Typography>
                  <RHFTextField name="flightNo" paramValue="TK1" isReadOnly />
                </Grid>
                <Grid xs={4}>
                  <Typography variant="subtitle2">Scheduled Date</Typography>
                  <RHFTextField name="date" paramValue="2024-10-03" isReadOnly />
                </Grid>
                <Grid xs={4}>
                  <Typography variant="subtitle2">Full Name</Typography>
                  <RHFTextField name="fullname" paramValue="Enes Berat ARSLAN" isReadOnly />
                </Grid>
                <Grid xs={4}>
                  <Typography variant="subtitle2">Arrival</Typography>
                  <RHFTextField name="arr" paramValue="IST" isReadOnly />
                </Grid>
                <Grid xs={4}>
                  <Typography variant="subtitle2">Departure</Typography>
                  <RHFTextField name="dep" paramValue="JFK" isReadOnly />
                </Grid>
                <Grid xs={4}>
                  <Typography variant="subtitle2">Weight Allowance</Typography>
                  <RHFTextField name="weight" paramValue="30 KG" isReadOnly />
                </Grid>
              </Grid>
            </Stack>
          </Card>

          <Card sx={{ mt: 2 }}>
            <Stack spacing={3} sx={{ p: 3 }}>
              <Grid container spacing={2}>
                <Grid xs={5}>
                  <Typography variant="subtitle2">Baggage Weight (KG)</Typography>
                  <TextField
                    fullWidth
                    type="text"
                    onChange={(event: any) => {
                      setWeightAllowance(event.target.value * 20);
                    }}
                  />
                </Grid>
                <Grid xs={5}>
                  <Typography variant="subtitle2">Miles</Typography>
                  <TextField fullWidth type="text" value={weightAllowance} disabled />
                </Grid>
                <Grid xs={2}>
                  <LoadingButton
                    variant="contained"
                    size="large"
                    loading={isSubmitting}
                    onClick={sendBaggage}
                    color="primary"
                    fullWidth
                    sx={{ mt: '22px' }}
                  >
                    Confirm
                  </LoadingButton>
                </Grid>
              </Grid>
            </Stack>
          </Card>
        </>
      )}
    </FormProvider>
  );
}
