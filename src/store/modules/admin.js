const state = {
    currentUser: initUser(), //새롭게 등록될 유저, 혹은 현재 유저정보.
    UsersINFO: [], //저장된 유저들을 담는 배열.
};

//사용되는 동작들
const mutations = {
    //이벤트를 수정하는 동작이다. 클릭된 일정에 id가 일치하지 않는 User를 UsersINFO내에 찾아내고
    //찾아낸 이벤트값들로 events 배열을 재구성하고 최종적으로 수정된 event를 집어넣어주면 끝이다.
    UPDATE_USER_INFO(state, getUser) {
        state.UsersINFO = state
            .UsersINFO
            .filter(e => e.id !== getUser.id); //이벤트배열의 재구성.
            getUser = makeUser(state, getUser); //그리고 배열을 추가.
        state
            .UsersINFO
            .push(getUser);
        //state.eventAddDialogUpdateMode = false
        //state.eventAddDialog = false;
        state.currentUser = initUser();
    },

    //이벤트를 추가하는 과정.
    ADD_NEW_USER(state, getUser) {
        getUser = makeUser(state, getUser);
        state
            .UsersINFO
            .push(getUser);
        state.eventAddDialog = false;
        state.currentUser = initUser();
    },

    /*
    //쓰는일이 없는 함수이지만, 혹시몰라서 냅둠.
    ADD_EVENTS(state, UsersINFO) {
        state.UsersINFO = [];
        UsersINFO.forEach(e => {
            state
                .UsersINFO
                .push(makeUser(state, e));
        });
    },
    */
    
    //바를 클릭했을때 나오는 디테일한 정보를 알려주는 다이얼로그를 보여주는 변수.
    SHOW_USER_INFO(state, getUser) {
        state
            .UsersINFO
            .forEach(e => {
                if (e.id === getUser.id) {
                    state.getUser = e;
                }
            })
        state.eventDetailDialog = true;
    },

    //이벤트를 업데이트하는 다이얼로그를 출력하게 도와주는 함수.
    /*
    UPDATE_USER_INFO(state, getUser) {
        state.currentUser = makeUser(state, getUser);
        state.eventDetailDialog = false;
        state.eventAddDialogUpdateMode = true; //이벤트를 추가하는 다이얼로그를 출력하긴 한다만,
        state.eventAddDialog = true; //이게 업데이트하는 모드라는걸 알려주기 위해서 이렇게한다.
    },
    */

    //이벤트를 삭제하는 함수. 디테일 다이얼로그내에서 진행되는 동작이기때문에 state.eventDetailDialog = false;
    //다음과같은 변수선언이 존재한다.
    DELETE_USER_INFO(state, getUser) {
        state.UsersINFO = state
            .UsersINFO
            .filter(e => e.id !== getUser.id);
        console.log(state.UsersINFO);
        state.eventDetailDialog = false;
        state.currentUser = initUser();
    }
};

//비동기 처리들.
const actions = {};

// 백엔드의 관점에서 볼때 time과 date를 나눠서 저장하게 되면 변수도 많아질 뿐더러 굉장히 비효율적일 수 밖에 없다. 저장하는 변수의
// 양을 줄일 수 있다면 줄이는게 맞는것이므로 이렇게 합쳐서 저장한다.
const makeUser = (state, currentUser) => {
    return {
        id: currentUser.id,
        password: currentUser.password,
        userName: currentUser.userName,
        userBirthDay: currentUser.userBirthDay
        /*
        ,
        start: event.startDate + getTime(event.startTime),
        end: event.endDate + getTime(event.endTime),
        */
    }
};

//이벤트의 형태를 잡아주는 변수.
function initUser() {
    return {
        id: '',
        password: '',
        userName: '',
        userBirthDay: ''
    }
}

export default {mutations, state, actions};