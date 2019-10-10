<template>
    <div>
        <div class="h-100 bg-plum-plate bg-animation">
            <div class="d-flex h-100 justify-content-center align-items-center">
                <b-col md="6" class="mx-auto app-login-box">
                    <div class="app-logo-inverse mx-auto mb-1"/>
                    <div class="modal-dialog mx-auto">
                        <div class="modal-content">
                            <div class="modal-body">
                                <div class="h5 modal-title text-center">
                                    <h4 class="mt-2">
                                        <div>系统登录</div>
                                    </h4>
                                </div>
                                <b-form-group id="exampleInputGroup1"
                                              label-for="exampleInput1"
                                              description="">
                                    <b-form-input id="exampleInput1"
                                                  type="text"
                                                  required
                                                  placeholder="用户名...">
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group id="exampleInputGroup2"
                                              label-for="exampleInput2">
                                    <b-form-input id="exampleInput2"
                                                  type="password"
                                                  required
                                                  placeholder="密码...">
                                    </b-form-input>
                                </b-form-group>
                                <b-form-checkbox class="text-right" name="check" id="exampleCheck">
                                    记住我
                                </b-form-checkbox>
                                <div class="divider"/>
                            </div>
                            <div class="modal-footer clearfix">
                                <div class="float-right">
                                    <b-button variant="primary" size="lg">登录</b-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center text-white opacity-8 mt-3">
                        Copyright &copy; Dolay 2019
                    </div>
                </b-col>
            </div>
        </div>
    </div>
</template>
