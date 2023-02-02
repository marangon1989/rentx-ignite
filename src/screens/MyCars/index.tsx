import React, { useState, useEffect } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import { AntDesign } from '@expo/vector-icons';

import { 
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  Appointment,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';

import { BackButton } from '../../components/BackButton';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  const theme = useTheme();


  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/schedules_byuser?user_id=1');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);
  
  return (
    <Container>
      <Header>
        <StatusBar 
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />
        <BackButton
          color={theme.colors.shape}
          onPress={handleBack} />
        <Title>
          Seus agendamentos, {'\n'}
          estão aqui.
        </Title>

        <Subtitle>
          Conforto, segurança e praticidade.
        </Subtitle>

      </Header>

      { 
        loading 
        ? <LoadAnimation /> 
        : <Content>
            <Appointment>
              <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
              <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
            </Appointment>
    
            <FlatList 
              data={cars}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <CarWapper>
                  <Car data={item.car} />
                  <CarFooter>
                    <CarFooterTitle>Período</CarFooterTitle>
                    <CarFooterPeriod>
                      <CarFooterDate>{item.startDate}</CarFooterDate>
                      <AntDesign 
                        name='arrowright'
                        size={20}
                        color={theme.colors.title}
                        style={{ marginHorizontal: 10 }}
                      />
                      <CarFooterDate>{item.endDate}</CarFooterDate>
                    </CarFooterPeriod>
                  </CarFooter>
                </CarWapper>
              )}
            />
          </Content>
      }


    </Container>
  );
}