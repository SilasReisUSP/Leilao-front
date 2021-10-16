import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { CadastroProdutoService } from '../../services/produto.service';


@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  providers: [CadastroProdutoService]
})
export class CadastroProdutoComponent implements OnInit {

  cadastroPForm: any
  fotoLeilao: Set<File>;

  constructor(private cadastroProdutoService: CadastroProdutoService) { }

  ngOnInit(): void {
    this.cadastroPForm= new FormGroup({
      leilao: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      localizacao: new FormControl('', [Validators.required]),
      lanceInicial: new FormControl('',[Validators.required])
    });
    
  }
  cadastrarProduto() : void {
    this.cadastroProdutoService.addProduto(this.cadastroPForm.value);
  }

  anexarFoto(event: any){
    const arquivoSelecionado = <FileList>event.srcElement.files;
    const fileNames = [];
    this.fotoLeilao = new Set();
    fileNames.push(arquivoSelecionado[0].name);
    this.fotoLeilao.add(arquivoSelecionado[0]);
    document.getElementById('fotoLeilao').innerHTML = arquivoSelecionado[0].name;
    //}
  }
  get leilao() { return this.cadastroPForm.get('leilao') }

  get localizacao() { return this.cadastroPForm.get('localizacao')}

  get lanceInicial() { return this.cadastroPForm.get('lanceInicial')}

  get dataInicial() { return this.cadastroPForm.get('dataInicial')}

  get dataFinal() { return this.cadastroPForm.get('dataFinal')}


  onUpload(){
    if (this.fotoLeilao && this.fotoLeilao.size > 0){
      
    }
  }
}
