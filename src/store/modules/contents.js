const state = {
    currentContent: initContent(), //새롭게 등록될 이벤트, 혹은 현재 이벤트.
    AllContents: [], //저장된 일정들을 담는 배열.
    randomContents: [],

    //데이터 처리를 위한 Content값
    DataProcessContent: initContent()


    //코멘트를 다는 기능도 필요하지 않을까...?
    //좋아요도 필요할듯...?
};

//사용되는 동작들
const mutations = {
    //다이얼로그를 열때(이벤트 생성 다이얼로그)
    OPEN_CONTENT(state, payload) {
        state.DataProcessContent.startDate = payload.date;
        state.DataProcessContent.startTime = payload.time;
    },
    FIND_CONTENT(state, ContentID){
        console.log(state.AllContents.find(c => c.id === parseInt(ContentID)));
        state.currentContent = state.AllContents.find(c => c.id === parseInt(ContentID))
    },
    FORMAT_DATACONTENT(state){
        state.DataProcessContent = initContent();
    },
    FORMAT_ALLCONTENTS(state){
        state.AllContents = [];
    },
    MAKE_RANDOM_CONTENTS(state){
        //중복제거 코드가 필요할듯.
        state.randomContents = [];
        let randomCheckArr = [];
        for(let i = 0; i < state.AllContents.length; i++){
            let n = randomNum(0, state.AllContents.length-1);
            if(randomCheckArr.indexOf(n) === -1){
                randomCheckArr.push(n);
                state.randomContents.push(state.AllContents[n]);
            }
            else{
                i--;
            }
            //console.log(state.AllContents[randomNum(0, state.AllContents.length - 1)]);
        }
    },
    //이벤트를 수정하는 동작이다. 클릭된 일정에 id가 일치하지 않는 event를 events내에서 찾아내고
    //찾아낸 이벤트값들로 events 배열을 재구성하고 최종적으로 수정된 event를 집어넣어주면 끝이다.
    UPDATE_CONTENT(state, getContent) {
        state.AllContents = state
            .AllContents
            .filter(e => e.id !== getContent.id); //이벤트배열의 재구성.
            getContent = makeContent(state, getContent); //그리고 배열을 추가.
        state
            .AllContents
            .push(getContent);
        state.DataProcessContent = initContent();
    },

    //이벤트를 추가하는 과정.
    ADD_CONTENT(state, getContent) {
        getContent = makeContent(state, getContent);
        state
            .AllContents
            .push(getContent);
        //console.log(getContent);
        state.DataProcessContent = initContent();
    },

    //쓰는일이 없는 함수이지만, 혹시몰라서 냅둠.
    ADD_CONTENTS(state, AllContents) {
        state.AllContents = [];
        AllContents.forEach(e => {
            state
                .AllContents
                .push(makeContent(state, e));
        });
    },
    
    //바를 클릭했을때 나오는 디테일한 정보를 알려주는 다이얼로그를 보여주는 변수.
    SHOW_CONTENT_DETAIL(state, content) {
        state
            .AllContents
            .forEach(e => {
                if (e.id === content.id) {
                    state.DataProcessContent = e;
                }
            })
    },
    
    //이벤트를 업데이트하는 다이얼로그를 출력하게 도와주는 함수.
    UPDATE_CONTENT_BY_DETAIL(state, getContent) {
        state.DataProcessContent = updateContent(getContent);
    },

    //디테일 이벤트를 닫는 함수.
    CLOSE_CONTENT_ABOUT_DETAIL(state) {
        state.DataProcessContent = initContent();
    },

    //이벤트를 삭제하는 함수. 디테일 다이얼로그내에서 진행되는 동작이기때문에 state.eventDetailDialog = false;
    //다음과같은 변수선언이 존재한다.
    DELETE_CONTENT_ABOUT_DETAIL(state, getEvent) {
        state.AllContents = state
            .AllContents
            .filter(e => e.id !== getEvent.id);
        //console.log(state.AllContents);
        state.eventDetailDialog = false;
        state.DataProcessContent = initContent();
    }
};

//비동기 처리들.
const actions = {};

const getTime = (time) => {
    return time === null
        ? ''
        : ` ${time}`;
};

// 백엔드의 관점에서 볼때 time과 date를 나눠서 저장하게 되면 변수도 많아질 뿐더러 굉장히 비효율적일 수 밖에 없다. 저장하는 변수의
// 양을 줄일 수 있다면 줄이는게 맞는것이므로 이렇게 합쳐서 저장한다.
const makeContent = (state ,content) => {
    return {
        id: state.AllContents.length,
        userID: content.userID,
        title: content.title,
        content: content.content,
        start: content.startDate + getTime(content.startTime),
        //색은 랜덤으로 지정. 여기서 만약 겹치는 날짜를 가지고 있는 이벤트가 있다면 그 색이 겹치지 않도록 설정하는것도 필요할듯.
    }
};

//이벤트의 양식을 initEvent를 통해 만들어지는 이벤트 양식으로 맞춰준다.
const updateContent = (content) => {
    //데이터로 이미지를 추가해보는건? https://stackoverflow.com/questions/53412106/linking-to-images-referenced-in-vuex-store-in-vue-js
    return {
        id: content.id,
        startDate: content
            .start
            .substr(0, 10), //합쳐진 배열에서 Date와 Time의 String 위치는 항상 동일하므로 substr로
        startTime: content
            .start
            .substr(11, 5), //String 위치를 가져와도 무방하다.
        content: content.content,
        title: content.name
    }
}

//이벤트의 형태를 잡아주는 변수.
function initContent() {
    return {
        id: '',
        userID: '',
        title: '',
        startDate: '',
        startTime: '',
        content: ''  //내용
    }
}

function randomNum(min, max){
    let randNum = Math.floor(Math.random()*(max-min+1)) + min;
    return randNum;
}

export default {mutations, state, actions};