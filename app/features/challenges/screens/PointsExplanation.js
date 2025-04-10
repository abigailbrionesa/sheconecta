import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { fontStyle } from "../../../utils/fontStyle"; 
import { backgroundStyle } from "../../../utils/backgroundStyle"; 

const PointsExplanation = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={[fontStyle.h2, fontStyle.bold]}>1. Sistema de Puntos</Text>

        <Text style={[fontStyle.h3, fontStyle.bold]}>1.1 Estudiantes</Text>
        <View style={styles.table}>
          <Text style={fontStyle.h4}>Acción</Text>
          <Text style={fontStyle.h4}>Puntos (Free)</Text>
          <Text style={fontStyle.h4}>Puntos (Planes)</Text>

          <Text style={fontStyle.body}>
            Completar perfil y verificación - 50 | 55
            {"\n"}Crear un proyecto colaborativo - 50 | 60
            {"\n"}Unirse a proyecto activo - 60 | 70
            {"\n"}Permanecer en proyecto (mín. 1 semana) - 10 | 15
            {"\n"}Asistir a mentoría vivencial - 50 | 60
            {"\n"}Dejar evaluación/feedback tras mentoría - 10 | 15
            {"\n"}Conectarse con otras usuarias* - 5 c/u | 5 c/u
            {"\n"}Participar en la comunidad** - 10 por interacción | 15 por interacción
            {"\n"}Participar en reto semanal - 20 a 40 | 25 a 50
            {"\n"}Participar en taller vivencial - 50 | 60
          </Text>
        </View>

        <Text style={[fontStyle.h3, fontStyle.bold]}>1.2 Mentoras</Text>
        <View style={styles.table}>
          <Text style={fontStyle.h4}>Acción</Text>
          <Text style={fontStyle.h4}>Puntos</Text>

          <Text style={fontStyle.body}>
            Asesorar mentoría (1 hora mínima) - 50
            {"\n"}Liderar proyecto con estudiantes - 80
            {"\n"}Participar como ponente en taller - 60
            {"\n"}Ser evaluada con 4.5★+ (cada 5 evaluaciones) - 30
            {"\n"}Compartir recurso con red de mentoras - 15
            {"\n"}Estar activa mensualmente - 20
          </Text>
        </View>

      </View>

      <View style={styles.section}>
        <Text style={[fontStyle.h2, fontStyle.bold]}>2. Recompensas</Text>

        <Text style={[fontStyle.h3, fontStyle.bold]}>2.1 Estudiantes</Text>
        <Text style={fontStyle.body}>
          250 pts: Badge “Activa” + ingreso a sorteo mensual
          {"\n"}500 pts: Certificado digital de participación
          {"\n"}800 pts: Acceso a mentoría grupal especial
          {"\n"}1000 pts: Visibilidad en ranking de comunidad
          {"\n"}1500 pts: Posibilidad de co-crear retos o ideas
          {"\n"}2000 pts: Invitación como guía junior (con mentora)
        </Text>

        <Text style={[fontStyle.h3, fontStyle.bold]}>2.2 Mentoras</Text>
        <Text style={fontStyle.body}>
          200 pts: Badge “Mentora Activa”
          {"\n"}400 pts: Certificado oficial como mentora aliada
          {"\n"}700 pts: Acceso preferente a proyectos destacados
          {"\n"}1000 pts: Rol de embajadora de comunidad
          {"\n"}1500 pts: Invitación para participar en contenido official
          {"\n"}2000 pts: Bono económico adicional trimestral (según evaluación)
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[fontStyle.h2, fontStyle.bold]}>3. Insignias (Badges)</Text>

        <Text style={[fontStyle.h3, fontStyle.bold]}>3.1 Estudiantes</Text>
        <Text style={fontStyle.body}>
          🌱 Activa: 250 puntos
          {"\n"}🤝 Conectora: 5 conexiones validadas
          {"\n"}🚀 Creadora: 2 proyectos creados
          {"\n"}🧠 SheLíder: 2000 puntos acumulados
          {"\n"}🎯 Constante: 2 retos semanales por 3 semanas seguidas
          {"\n"}💼 ConectaPro: Plan anual activo
        </Text>

        <Text style={[fontStyle.h3, fontStyle.bold]}>3.2 Mentoras</Text>
        <Text style={fontStyle.body}>
          💼 Mentora Activa: 3 mentorías + 200 pts
          {"\n"}🧭 Guía Experta: 700 pts + 2 proyectos liderados
          {"\n"}🌟 Embajadora SheConecta: 1500 pts + participación en evento/taller
          {"\n"}🤍 Red Mentora: Acceso a comunidad exclusiva de mentoras
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[fontStyle.h2, fontStyle.bold]}>4. Sistema de Suscripción</Text>

        <Text style={[fontStyle.h3, fontStyle.bold]}>4.1 Plan Free</Text>
        <Text style={fontStyle.body}>
          Mentorías: 2/mes
          {"\n"}Crear 1 proyecto, unirse a 2
          {"\n"}Comunidad básica (principiante/intermedio)
          {"\n"}1 taller mensual (según cupo)
          {"\n"}Participación en retos (máx. 2 por semana)
          {"\n"}Puntos x1
        </Text>

        <Text style={[fontStyle.h3, fontStyle.bold]}>4.2 Plan Conecta+ (S/ 15)</Text>
        <Text style={fontStyle.body}>
          Todo lo anterior + mentorías ilimitadas
          {"\n"}Acceso total a comunidad (incluye avanzadas)
          {"\n"}Recursos exclusivos, sorteos, eventos
          {"\n"}Multiplicador de puntos x1.2
        </Text>

        <Text style={[fontStyle.h3, fontStyle.bold]}>4.3 Plan SheTeam (S/ 35)</Text>
        <Text style={fontStyle.body}>
          Todo lo de Conecta+ (para hasta 4 personas)
          {"\n"}Canal privado, seguimiento grupal, retos grupales
        </Text>

        <Text style={[fontStyle.h3, fontStyle.bold]}>4.4 Plan ConectaPro (S/ 120 anual)</Text>
        <Text style={fontStyle.body}>
          Todo lo anterior + bonificación inicial de 200 pts
          {"\n"}Badge exclusivo + puntos x1.5
          {"\n"}Acceso a sorteos anuales grandes
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[fontStyle.h2, fontStyle.bold]}>5. Bonificación para Mentoras</Text>

        <Text style={fontStyle.body}>
          Se propone un sistema simbólico de reconocimiento por impacto y compromiso comunitario.
          {"\n"}5.1 Actividades y Bonificaciones Económicas:
          {"\n"}Mentoría individual o grupal: S/ 5 – 10
          {"\n"}Liderar un proyecto: S/ 20 – 30
          {"\n"}Taller vivencial como ponente: S/ 15 – 25
          {"\n"}Participación trimestral destacada: S/ 50 – 100
        </Text>

        <Text style={fontStyle.body}>
          Beneficios adicionales:
          {"\n"}Acceso a red exclusiva de mentoras
          {"\n"}Visibilidad en el directorio premium
          {"\n"}Certificados y badges
          {"\n"}Eventos, formación interna y contenido official
          {"\n"}Carta de recomendación según compromiso
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  table: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
});

export default PointsExplanation;