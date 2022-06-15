import styled from 'styled-components';

export const Body = styled.div`
    height: 70vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10%;
    padding-bottom: 10%;
    justify-content: center;
`;

Body.Left = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 50%;
    margin: 10px;

    @media screen and (max-width: 1200px) {
        display: none !important;
    }
`;

Body.Right = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 50%;

    @media screen and (max-width: 900px) {
      width: 75%;
    }
    @media screen and (max-width: 600px) {
      width: 90%;
    }
`;

export const BodyUser = styled.div`
    height: -webkit-fill-available;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 600px) {
    height: -webkit-fill-available;
     padding: 7px;
    }

    @media screen and (min-height: 1024px) {
        height: 83.3vh;
    }
`;

BodyUser.center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;

    @media screen and (max-width: 900px) {
      width: 75%;
    }
    @media screen and (max-width: 600px) {
      width: 100% !important;
      padding: 7px;
    }
`;

export const StoreBodyWrapper = styled.div`
    min-height: 65vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    @media screen and (min-height: 1024px) {
      height: fit-content;
  }
`;

export const StoreBody = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    height: 100%;
    width: 70%;

    @media screen and (max-width: 913px) {
      width: 80%;
    }
    @media screen and (max-width: 600px) {
      width: 90%;
    }
`;

export const Formulary = styled.form`
  align-items: center;
  justify-content: center;
  width: 50%;
  border: 1px;
  margin: 10px;   
  @media screen and (max-width: 1200px) {
    width: 80%;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const StoreFormulary = styled.div`
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px;
  margin: 10px;
`;

export const TopFormulary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
`;

export const ItemFormulary = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-right: 5px;
`;

// Div exclusiva para componente IE:
export const IEItemFormulary = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items:left;
`;

export const DividedItemFormulary = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 500px) {
      width: 100%;
      flex-direction: column;
    }
`;

export const BottomFormulary = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 5px;

  @media screen and (max-width: 400px) {
    padding: 5px;
  }
`;

export const UnderFields = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
