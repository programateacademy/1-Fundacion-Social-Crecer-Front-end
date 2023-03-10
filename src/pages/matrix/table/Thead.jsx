import "./BeneficiariesTable.css";
import { useState, useEffect } from "react";
import { useArrayContext } from "../../../context/context";
import { useSetArrayContext } from "../../../context/context";
import { useSetFilterContext } from "../../../context/context";

function Thead({ trans = false }) {
  let setFilter = useSetFilterContext();
  let data = useArrayContext();
  let setArray = useSetArrayContext();
  //Variables for the filters
  const [curState, setCurState] = useState(0);
  const [unity, setUnity] = useState(0);
  const [dupla, setDupla] = useState(0);
  const [benef, setBenef] = useState(0);
  const [foca, setFoca] = useState(0);
  const [benefcomp, setBenefComp] = useState(0);

  //Update context array because actions
  useEffect(() => {
    setFilter(arrayfilter);
  }, [curState, unity, dupla, benef, foca, benefcomp]);

  // filter all solicitated data
  let arrayfilter = data.filter(
    (item) =>
      item.curState == (curState == 0 ? item.curState : curState) &&
      item.unityName == (unity == 0 ? item.unityName : unity) &&
      item.duoName == (dupla == 0 ? item.duoName : dupla) &&
      item.beneficiaryType == (benef == 0 ? item.beneficiaryType : benef) &&
      item.focusingCriteria == (foca == 0 ? item.focusingCriteria : foca) &&
      item.beneficiaryComplement ==
        (benefcomp == 0 ? item.beneficiaryComplement : benefcomp)
  );

  return (
    <thead className={trans ? "transp" : ""}>
      <tr>
        <td>EDITAR</td>
        <td>NUMERO DE DOCUMENTO</td>
        <td>
          ¿ACTIVO O INACTIVO? <br />
          <select
            name="select"
            value={curState}
            onChange={(e) => {
              setCurState(e.target.value);
            }}
          >
            <option value={0}>NO FILTRAR</option>
            <option value="INACTIVO">INACTIVO</option>
            <option value="ACTIVO">ACTIVO</option>
          </select>
          {/*<button onClick={()=>{setCurState(0)}}>change</button>*/}
        </td>
        <td>FECHA DE INGRESO</td>
        <td>FECHA DE EGRESO</td>
        <td>INGRESA POR:</td>
        <td>MOTIVO DE EGRESO</td>
        <td>SI EL MOTIVO DE EGRESO ES "OTRO", INDIQUE EL POR QUÉ</td>
        <td className="tb-unidad">
          UNIDAD <br />
          <select
            name="select"
            onChange={(e) => {
              setUnity(e.target.value);
            }}
          >
            <option value={0}>NO FILTRAR</option>
            <option value="FISCALA">FISCALA- U1</option>
            <option value="USME">USME- U2</option>
            <option value="SERRANIAS">SERRANIAS- U3</option>
            <option value="VIRREY">VIRREY- U4</option>
            <option value="SAN JUAN A">SAN JUAN A- U5</option>
            <option value="EL UVAL">EL UVAL - U6</option>
            <option value="TRIANGULO">TRIANGULO - U7</option>
            <option value="LORENZO">LORENZO- U8</option>
          </select>
        </td>
        <td className="tb-dupla">
          DUPLA
          <br />
          <select
            name="select"
            onChange={(e) => {
              setDupla(e.target.value);
            }}
          >
            {unity == "FISCALA" && (
              <>
                <option value={0}>NO FILTRAR</option>
                <option value="GA 1">GA 1</option>
                <option value="GA 2">GA 2</option>
                <option value="GA 3">GA 3</option>
                <option value="GA 4">GA 4</option>
                <option value="GA 5">GA 5</option>
                <option value="GA 6">GA 6</option>
              </>
            )}
            {unity == "USME" && (
              <>
                <option value={0}>NO FILTRAR</option>
                <option value="CRECIENDO CON AMOR">CRECIENDO CON AMOR</option>
                <option value="PEQUEÑAS GRANDEZAS">PEQUEÑAS GRANDEZAS</option>
                <option value="AMOR SIN FRONTERAS">AMOR SIN FRONTERAS</option>
                <option value="CLAN SONRISAS">CLAN SONRISAS</option>
                <option value="PARAISO KIDS">PARAISO KIDS</option>
                <option value="DEJANDO HUELLA">DEJANDO HUELLA</option>
              </>
            )}
            {unity == "SERRANIAS" && (
              <>
                <option value={0}>NO FILTRAR</option>
                <option value="CRECIENDO JUNTOS">CRECIENDO JUNTOS</option>
                <option value="FABRICANDO SONRISAS">FABRICANDO SONRISAS</option>
                <option value="HUELLAS INFANTILES">HUELLAS INFANTILES</option>
                <option value="MI SEGUNDO HOGAR">MI SEGUNDO HOGAR</option>
                <option value="NIDO DE AMOR"> NIDO DE AMOR</option>
                <option value="TEJEDORAS">TEJEDORAS</option>
              </>
            )}
            {unity == "VIRREY" && (
              <>
                <option value={0}>NO FILTRAR</option>
                <option value="KAWIYARÍ">KAWIYARÍ</option>
                <option value="AWÁ">AWÁ</option>
                <option value="MAYU">MAYU</option>
                <option value="KOGUI">KOGUI</option>
                <option value="YAGUA">YAGUA</option>
                <option value="YUKUNA">YUKUNA</option>
              </>
            )}
            {unity == "SAN JUAN A" && (
              <>
                <option value={0}>NO FILTRAR</option>
                <option value=" A1"> A1</option>
                <option value="A2">A2</option>
                <option value="A3">A3</option>
                <option value="A4">A4</option>
                <option value="A5">A5</option>
                <option value="A6">A6</option>
              </>
            )}
            {unity == "EL UVAL" && (
              <>
                <option value={0}>NO FILTRAR</option>
                <option value="U1-VINCULOS DE AMOR">VINCULOS DE AMOR</option>
                <option value="U1-VINCULOS DE AMOR VEREDAS">VINCULOS DE AMOR VEREDAS</option>
                <option value="U2-MIS ANGELITOS">MIS ANGELITOS</option>
                <option value="U4-TEJIENDO SABERES">TEJIENDO SABERES</option>
                <option value="U3-SEMILLAS DE PAZ">SEMILLAS DE PAZ</option>
                <option value="U5-GRANDES TALENTOS">GRANDES TALENTOS</option>
                <option value="HILANDO CAMINOS">HILANDO CAMINOS</option>
                <option value="TIHUAQUE">TIHUAQUE</option>
              </>
            )}
            {unity == "TRIANGULO" && (
              <>
                <option value={0}>NO FILTRAR</option>
                <option value="MARIA CALDERO">MARIA CALDERO</option>
                <option value="LUZ DARY SOLANO">LUZ DARY SOLANO</option>
                <option value="DALLAN SIERRA">DALLAN SIERRA</option>
                <option value="ALIX FONSECA">ALIX FONSECA</option>
                <option value="ANGIE YARA">ANGIE YARA</option>
                <option value="ADRIANA MONROY">ADRIANA MONROY</option>
              </>
            )}
            {unity == "LORENZO" && (
              <>
                <option value={0}>NO FILTRAR</option>
                <option value="AURA TORRES">AURA TORRES</option>
                <option value="CEILA FERNANDEZ">CEILA FERNANDEZ</option>
                <option value=" CLAUDIA RODRIGUEZ"> CLAUDIA RODRIGUEZ</option>
                <option value="LINA RODRIGUEZ">LINA RODRIGUEZ</option>
                <option value="SANDRA RAMIREZ">SANDRA RAMIREZ</option>
                <option value="VICTORIA TORRE">VICTORIA TORRE</option>
                <option value="YENI PAOLA ROA">YENI PAOLA ROA</option>
              </>
            )}
          </select>
        </td>

        <td className="tb-unidad">DOCENTE</td>
        <td className="tb-beneficiario">TIPO DE DOCUMENTO</td>
        <td className="tb-beneficiario">PRIMER NOMBRE</td>
        <td className="tb-beneficiario">SEGUNDO NOMBRE</td>
        <td className="tb-beneficiario">PRIMER APELLIDO</td>
        <td className="tb-beneficiario">SEGUNDIO APELLIDO</td>
        <td className="tb-beneficiario">NOMBRE COMPLETO</td>
        <td className="tb-beneficiario">FECHA DE NACIMIENTO</td>
        <td className="tb-beneficiario">AÑOS</td>
        <td className="tb-beneficiario">MESES</td>
        <td className="tb-beneficiario">DÍAS</td>
        <td className="tb-beneficiario">EDAD</td>
        <td className="tb-beneficiario">
          TIPO DE BENEFICIARIO
          <br />
          <select
            name="select"
            onChange={(e) => {
              setBenef(e.target.value);
            }}
          >
            <option value={0}>NO FILTRAR</option>
            <option value="MUJER GESTANTE">MUJER GESTANTE</option>
            <option value="MENOR DE SEIS MESES">MENOR DE SEIS MESES</option>
            <option value="NIÑO O NIÑA ENTRE 6 MESES Y 5 AÑOS Y 11 MESES">
              NIÑO O NIÑA ENTRE 6 MESES Y 5 AÑOS Y 11 MESES
            </option>
          </select>
        </td>
        <td className="tb-beneficiario">GÉNERO</td>
        <td className="tb-beneficiario">PAÍS DE NACIMIENTO</td>
        <td className="tb-beneficiario">DEPARTAMENTO DE NACIMIENTO</td>
        <td className="tb-beneficiario">MUNICIPIO DE NACIMIENTO</td>
        <td className="tb-beneficiario">DISCAPACIDAD</td>
        <td className="tb-beneficiario">DISCAPACIDAD CERTIFICADA</td>
        <td className="tb-beneficiario">
          ENTIDAD QUE CERTIFICA LA DISCAPACIDAD
        </td>
        <td className="tb-beneficiario">CATEGORIA DE LA DISCAPACIDAD</td>
        <td className="tb-beneficiario">ESPECIFICAR LA DISCAPACIDAD</td>
        <td className="tb-beneficiario">
          ¿ESTÁ INSCRITO EN EL REGISTRO PARA LA LOCALIZACIÓN Y CARACTERIZACIÓN
          DE PERSONAS CON DISCAPACIDAD?
        </td>
        <td className="tb-beneficiario">¿REQUIERE LA AYUDA DE OTRA PERSONA?</td>
        <td className="tb-beneficiario">
          ¿REQUIERE AYUDA TÉCNICA / PRODUCTO DE APOYO?
        </td>
        <td className="tb-beneficiario">
          ¿CUENTA CON LA AYUDA TÉCNICA / PRODUCTO DE APOYO?
        </td>
        <td className="tb-beneficiario">
          ¿REQUIERE TERAPIA Y/O REHABILITACIÓN?
        </td>
        <td className="tb-beneficiario">
          ¿RECIBE ATENCIÓN EN TERAPIA Y/O REHABILITACIÓN?
        </td>
        <td className="tb-beneficiario">¿TIENE PROCESO DE INTERDICCIÓN?</td>
        <td className="tb-beneficiario">PAIS DE RESIDENCIA</td>
        <td className="tb-beneficiario">DEPARTAMENTO DE RESIDENCIA</td>
        <td className="tb-beneficiario">ZONA DE UBICACIÓN</td>
        <td className="tb-beneficiario">TIPO DE CABECERA</td>
        <td className="tb-beneficiario">
          NOMBRE LOCALIDAD / COMUNAS / NOMBRE DE ZONA RESTO
        </td>
        <td className="tb-beneficiario">BARRIO</td>
        <td className="tb-beneficiario">NOMBRE DE LA ZONA RESTO</td>
        <td className="tb-beneficiario">DIRECCIÓN</td>
        <td className="tb-beneficiario">TELEFONO PRINCIPAL</td>
        <td className="tb-beneficiario">TELEFONO SECUNDARIO</td>
        <td className="tb-beneficiario">ESTRATO DEL HOGAR</td>
        <td className="tb-beneficiario">GRUPO ÉTNICO</td>
        <td className="tb-beneficiario">BENEFICIARIO SISBENIZADO</td>
        <td className="tb-beneficiario">PUNTAJE SISBEN</td>
        <td className="tb-beneficiario">PERTENECE A FAMILIAS EN ACCIÓN</td>
        <td className="tb-beneficiario">
          EL BENEFICIARIO HA SIDO VICTIMA DIRECTA CONFLICTO ARMADO
        </td>
        <td className="tb-beneficiario">
          CRITERIOS DE FOCALIZACION
          <br />
          <select
            className="selectThead"
            name="select"
            onChange={(e) => {
              setFoca(e.target.value);
            }}
          >
            <option value={0}>NO FILTRAR</option>
            <option value="a. Pertenecientes a hogares con puntaje SISBEN">
              A. PERTENECIENTES A HOGARES CON PUNTAJE SISBEN.
            </option>
            <option value="Pertenecientes a familias identificadas a través de la Estrategia para la Superación de la Pobreza Extrema – Red UNIDOS.">
              B. PERTENECIENTES A FAMILIAS IDENTIFICADAS A TRAVÉS DE LA
              ESTRATEGIA PARA LA SUPERACIÓN DE LA POBREZA EXTREMA – RED UNIDOS.
            </option>
            <option value="c. Niñas, niños y mujeres gestantes pertenecientes al programa Familias en Acción de Prosperidad Social.">
              C. NIÑAS, NIÑOS Y MUJERES GESTANTES PERTENECIENTES AL PROGRAMA
              FAMILIAS EN ACCIÓN DE PROSPERIDAD SOCIAL.
            </option>
            <option value="d. Niñas y niños egresados de la estrategia de atención y prevención de la desnutrición aguda (Centros de Recuperación Nutricional -CRN- y 1000 días para cambiar el mundo y unidades de búsqueda activa).">
              D. NIÑAS Y NIÑOS EGRESADOS DE LA ESTRATEGIA DE ATENCIÓN Y
              PREVENCIÓN DE LA DESNUTRICIÓN AGUDA (CENTROS DE RECUPERACIÓN
              NUTRICIONAL -CRN- Y 1000 DÍAS PARA CAMBIAR EL MUNDO Y UNIDADES DE
              BÚSQUEDA ACTIVA).
            </option>
            <option value="e. Remitidos por las entidades del Sistema Nacional de Bienestar Familiar -SNBF- que se encuentren en situación de vulnerabilidad, riesgo de vulneración de derechos o programas de protección del ICBF.">
              E. REMITIDOS POR LAS ENTIDADES DEL SISTEMA NACIONAL DE BIENESTAR
              FAMILIAR -SNBF- QUE SE ENCUENTREN EN SITUACIÓN DE VULNERABILIDAD,
              RIESGO DE VULNERACIÓN DE DERECHOS O PROGRAMAS DE PROTECCIÓN DEL
              ICBF.
            </option>
            <option value="f. Víctimas de hechos violentos asociados al conflicto armado, de acuerdo con las directrices establecidas en la Ley 1448 de 2011 y los Decretos ley 4633, 4634 y 4635 de 2011, así como la Sentencia T-025 de 2004 proferida por la Corte Constitucional y demás desarrollos jurisprudenciales en torno a la existencia de un estado de cosas inconstitucional; para lo cual se considerarán aquellos cuyo estado se encuentre incluido dentro del RUV.">
              F. VÍCTIMAS DE HECHOS VIOLENTOS ASOCIADOS AL CONFLICTO ARMADO, DE
              ACUERDO CON LAS DIRECTRICES ESTABLECIDAS EN LA LEY 1448 DE 2011 Y
              LOS DECRETOS LEY 4633, 4634 Y 4635 DE 2011, ASÍ COMO LA SENTENCIA
              T-025 DE 2004 PROFERIDA POR LA CORTE CONSTITUCIONAL Y DEMÁS
              DESARROLLOS JURISPRUDENCIALES EN TORNO A LA EXISTENCIA DE UN
              ESTADO DE COSAS INCONSTITUCIONAL; PARA LO CUAL SE CONSIDERARÁN
              AQUELLOS CUYO ESTADO SE ENCUENTRE INCLUIDO DENTRO DEL RUV.
            </option>
            <option value="g. Pertenecientes a comunidades étnicas (indígenas, comunidades negras, afrocolombianas, Palenqueros, Raizales y Rrom), que demanden el servicio.">
              G. PERTENECIENTES A COMUNIDADES ÉTNICAS (INDÍGENAS, COMUNIDADES
              NEGRAS, AFROCOLOMBIANAS, PALENQUEROS, RAIZALES Y RROM), QUE
              DEMANDEN EL SERVICIO.
            </option>
            <option value="h. Niños y niñas con discapacidad que requieren diversos tipos de apoyo para su participación efectiva y que demandan acompañamiento en las actividades de cuidado; así como los que sean remitidos por las entidades del SNBF con base en el registro para la localización y caracterización de personas con discapacidad del Ministerio de Salud y Protección Social, como de los comités territoriales y locales de discapacidad y las entidades territoriales en salud.">
              H. NIÑOS Y NIÑAS CON DISCAPACIDAD QUE REQUIEREN DIVERSOS TIPOS DE
              APOYO PARA SU PARTICIPACIÓN EFECTIVA Y QUE DEMANDAN ACOMPAÑAMIENTO
              EN LAS ACTIVIDADES DE CUIDADO; ASÍ COMO LOS QUE SEAN REMITIDOS POR
              LAS ENTIDADES DEL SNBF CON BASE EN EL REGISTRO PARA LA
              LOCALIZACIÓN Y CARACTERIZACIÓN DE PERSONAS CON DISCAPACIDAD DEL
              MINISTERIO DE SALUD Y PROTECCIÓN SOCIAL, COMO DE LOS COMITÉS
              TERRITORIALES Y LOCALES DE DISCAPACIDAD Y LAS ENTIDADES
              TERRITORIALES EN SALUD.
            </option>
            <option value="i. Usuarios del subsidio en especie para población vulnerable, del que trata el artículo 12 de la Ley 1537 de 2012 (Vivienda de Interés Social y Vivienda de Interés Prioritario), y el Decreto 1921 de 2012 o el que reglamente la materia.">
              I. USUARIOS DEL SUBSIDIO EN ESPECIE PARA POBLACIÓN VULNERABLE, DEL
              QUE TRATA EL ARTÍCULO 12 DE LA LEY 1537 DE 2012 (VIVIENDA DE
              INTERÉS SOCIAL Y VIVIENDA DE INTERÉS PRIORITARIO), Y EL DECRETO
              1921 DE 2012 O EL QUE REGLAMENTE LA MATERIA.
            </option>
            <option value="j. Niñas y niños cuyos padres estén en establecimientos de reclusión.">
              J. NIÑAS Y NIÑOS CUYOS PADRES ESTÉN EN ESTABLECIMIENTOS DE
              RECLUSIÓN.
            </option>
            <option value="k. Población migrante, refugiada o apátrida que cumpla con alguna de las siguientes características: ausencia de vivienda o condiciones de hacinamiento, que no cuenten con acceso a servicios públicos domiciliarios o que no cuenten con ningún tipo de afiliación al Sistema General de Seguridad Social en Salud.">
              K. POBLACIÓN MIGRANTE, REFUGIADA O APÁTRIDA QUE CUMPLA CON ALGUNA
              DE LAS SIGUIENTES CARACTERÍSTICAS: AUSENCIA DE VIVIENDA O
              CONDICIONES DE HACINAMIENTO, QUE NO CUENTEN CON ACCESO A SERVICIOS
              PÚBLICOS DOMICILIARIOS O QUE NO CUENTEN CON NINGÚN TIPO DE
              AFILIACIÓN AL SISTEMA GENERAL DE SEGURIDAD SOCIAL EN SALUD.
            </option>
            <option value="l. Niñas y niños remitidos del servicio HCB FAMI y DIMF que al cumplir los dos (2) años deben transitar a otros servicios de educación inicial de atención permanente.">
              L. NIÑAS Y NIÑOS REMITIDOS DEL SERVICIO HCB FAMI Y DIMF QUE AL
              CUMPLIR LOS DOS (2) AÑOS DEBEN TRANSITAR A OTROS SERVICIOS DE
              EDUCACIÓN INICIAL DE ATENCIÓN PERMANENTE.
            </option>
            <option value="m. Niñas y niños cuyos padres estén activos en la ruta de reincorporación e identificados en las bases de datos remitidas de forma oficial al ICBF por la Agencia para la Reincorporación y la Normalización – ARN.">
              M. NIÑAS Y NIÑOS CUYOS PADRES ESTÉN ACTIVOS EN LA RUTA DE
              REINCORPORACIÓN E IDENTIFICADOS EN LAS BASES DE DATOS REMITIDAS DE
              FORMA OFICIAL AL ICBF POR LA AGENCIA PARA LA REINCORPORACIÓN Y LA
              NORMALIZACIÓN – ARN.
            </option>
            <option value="n. Para el servicio de Hogar Infantil se atenderá prioritariamente niños y niñas hijos de trabajadores que evidencien vinculación laboral y demás requisitos establecidos en la resolución 1740 de 2010.">
              N. PARA EL SERVICIO DE HOGAR INFANTIL SE ATENDERÁ PRIORITARIAMENTE
              NIÑOS Y NIÑAS HIJOS DE TRABAJADORES QUE EVIDENCIEN VINCULACIÓN
              LABORAL Y DEMÁS REQUISITOS ESTABLECIDOS EN LA RESOLUCIÓN 1740 DE
              2010.
            </option>
            <option value="o. Ingresos iguales o inferiores a 1.5 Smlv">
              O. INGRESOS IGUALES O INFERIORES A 1.5 SMLV.
            </option>
          </select>
        </td>
        <td className="tb-beneficiario">
          SI NO CUMPLE CON NINGÚN CRITERIO, CUENTA CON EL ACTA DONDE JUSTIFICA
          QUE EL BENEFICIARIO REQUIERE LA ATENCIÓN
        </td>
        <td className="tb-acudiente">TIPO DE RESPONSABLE</td>
        <td className="tb-acudiente">TIPO DE DOCUMENTO ACUDIENTE</td>
        <td className="tb-acudiente">NUMERO DE DOCUMENTO DEL ACUDIENTE</td>
        <td className="tb-acudiente">PRIMER NOMBRE ACUDIENTE</td>
        <td className="tb-acudiente">SEGUNDO NOMBRE ACUDIENTE</td>
        <td className="tb-acudiente">PRIMER APELLIDO ACUDIENTE</td>
        <td className="tb-acudiente">SEGUNDO APELLIDO ACUDIENTE</td>
        <td className="tb-acudiente">FECHA DE NACIMIENTO ACUDIENTE</td>
        <td className="tb-acudiente">PAIS DE NACIMIENTO ACUDIENTE</td>
        <td className="tb-acudiente">DEPARTAMENTO DE NACIMIENTO ACUDIENTE</td>
        <td className="tb-acudiente">MUNICIPIO DE NACIMIENTO ACUDIENTE</td>
        <td className="tb-padre">TIPO DE DOCUMENTO PAPÁ</td>
        <td className="tb-padre">NUMERO DE DOCUMENTO DEL PAPÁ</td>
        <td className="tb-padre">PRIMER NOMBRE PAPÁ</td>
        <td className="tb-padre">SEGUNDO NOMBRE PAPÁ</td>
        <td className="tb-padre">PRIMER APELLIDO PAPÁ</td>
        <td className="tb-padre">SEGUNDO APELLIDO PAPÁ</td>
        <td className="tb-padre">FECHA DE NACIMIENTO PAPÁ</td>
        <td className="tb-padre">EDAD PAPÁ (AÑOS)</td>
        <td className="tb-padre">PAIS DE NACIMIENTO PAPÁ</td>
        <td className="tb-padre">DEPARTAMENTO DE NACIMIENTO PAPÁ</td>
        <td className="tb-padre">MUNICIPIO DE NACIMIENTO PAPÁ</td>
        <td className="tb-madre">TIPO DE DOCUMENTO MAMÁ</td>
        <td className="tb-madre">NUMERO DE DOCUMENTO DE LA MAMÁ</td>
        <td className="tb-madre">PRIMER NOMBRE MAMÁ</td>
        <td className="tb-madre">SEGUNDO NOMBRE MAMÁ</td>
        <td className="tb-madre">PRIMER APELLIDO MAMÁ</td>
        <td className="tb-madre">SEGUNDO APELLIDO MAMÁ</td>
        <td className="tb-madre">FECHA DE NACIMIENTO MAMÁ</td>
        <td className="tb-madre">EDAD MAMÁ</td>
        <td className="tb-madre">PAIS DE NACIMIENTO MAMÁ</td>
        <td className="tb-madre">DEPARTAMENTO DE NACIMIENTO MAMÁ</td>
        <td className="tb-madre">MUNICIPIO DE NACIMIENTO MAMÁ</td>
        <td className="tb-historial-medico">REGIMEN</td>
        <td className="tb-historial-medico">EPS</td>
        <td className="tb-historial-medico">
          ¿EL BENEFICIARIO CUENTA CON EL CARNET DE VACUNACIÓN? *
        </td>
        <td className="tb-historial-medico">
          {" "}
          FECHA DE VERIFICACIÓN DEL ESQUEMA DE VACUNACIÓN
        </td>
        <td className="tb-historial-medico">
          ¿EL CARNET DE VACUNACIÓN SE ENCUENTRA AL DÍA EN LAS VACUNAS Y DOSIS
          QUE CORRESPONDEN A LA EDAD DEL NIÑO O NIÑA? *
        </td>
        <td className="tb-historial-medico">
          ¿EL BENEFICIARIO PRESENTA CARNET DE CRECIMIENTO Y DESARROLLO? *{" "}
        </td>
        <td className="tb-historial-medico">
          SI EL NIÑO CUENTA CON EL CARNET, VERIFIQUE ¿CUÁNTOS CONTROLES DE
          CRECIMIENTO Y DESARROLLO HA RECIBIDO EL NIÑO, EN LOS ÚLTIMOS 6 MESES?{" "}
        </td>
        <td className="tb-historial-medico">ANTECEDENTE DE PREMATUREZ *</td>
        <td className="tb-historial-medico">
          A LA FECHA DE VALORACIÓN EL BENEFICIARIO TIENE MENOS DE 40 SEMANAS
        </td>
        <td className="tb-historial-medico">PERIMETRO CEFÁLICO</td>
        <td className="tb-historial-medico">EDAD GESTACIONAL AL NACER * </td>
        <td className="tb-historial-medico">PESO AL NACER (EN KILOGRAMOS) *</td>
        <td className="tb-historial-medico">
          TALLA AL NACER (EN CENTÍMETROS) *
        </td>
        <td className="tb-historial-medico">
          SI EL NIÑO O NIÑA ES MENOR DE 6 MESES, ¿ESTÁ SIENDO ALIMENTADO CON
          LECHE MATERNA DE FORMA EXCLUSIVA?
        </td>
        <td className="tb-historial-medico">
          DURACIÓN LACTANCIA MATERNA EXCLUSIVA (MESES)
        </td>
        <td className="tb-historial-medico">
          DURACIÓN LACTANCIA MATERNA TOTAL (MESES)
        </td>
        <td className="tb-historial-medico">SEMANAS DE GESTACIÓN</td>
        <td className="tb-unidad">
          TIPO COMPLEMENTO
          <select
            name="select"
            onChange={(e) => {
              setBenefComp(e.target.value);
            }}
          >
            <option value={0}>NO FILTRAR</option>
            <option value="MADRES GESTANTES Y MADRES LACTANTES">
              MADRES GESTANTES Y MADRES LACTANTES
            </option>
            <option value="NIÑOS Y NIÑAS DE 6 MESES A 11 MESES 29 DIAS">
              NIÑOS Y NIÑAS DE 6 MESES A 11 MESES 29 DIAS
            </option>
            <option value="NIÑOS Y NIÑAS MAYORES DE 1 AÑO">
              NIÑOS Y NIÑAS MAYORES DE 1 AÑO
            </option>
            <option value="MAYORES A 3 AÑOS">MAYORES A 3 AÑOS</option>
          </select>
        </td>
        <td className="tb-unidad">
          SI EL BENEFICIARIO TIENE TICKET, INDIQUE EL NÚMERO DE TICKET
        </td>
      </tr>
    </thead>
  );
}

export default Thead;
